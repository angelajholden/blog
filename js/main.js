document.addEventListener("DOMContentLoaded", function () {
	// For development only
	const linkRelStyle = document.querySelectorAll('link[rel="stylesheet"]');
	linkRelStyle.forEach((link) => {
		const href = link.getAttribute("href");
		const hasQuery = href.includes("?");
		const randomVersion = Math.floor(Math.random() * 100000);
		const newHref = hasQuery ? `${href}&devcache=${randomVersion}` : `${href}?devcache=${randomVersion}`;
		link.setAttribute("href", newHref);
	});

	// You Are Here Navigation
	const links = document.querySelectorAll(".nav_link");
	console.log(links);
	const href = window.location.href;
	console.log(href);
	links.forEach((link) => {
		// console.log(link.href);
		if (link.href === href) {
			link.classList.add("active");
		}
	});

	const menuButton = document.querySelector(".button_menu");
	const menu = document.querySelector(".mobile_off_canvas");
	const searchButton = document.querySelector(".button_search");
	const closeButton = document.querySelector(".button_close");
	const searchDrawer = document.querySelector(".search_drawer");
	const searchInput = document.querySelector(".search_input");
	const body = document.querySelector("body");

	function getFocusableElements(container, includeExtra = null) {
		let elements = [...container.querySelectorAll('a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])')].filter((el) => !el.hasAttribute("disabled"));

		// Include additional element (like menuButton) at the start
		if (includeExtra) {
			elements.unshift(includeExtra);
		}
		return elements;
	}

	function trapFocus(event, container, includeExtra = null) {
		const focusableElements = getFocusableElements(container, includeExtra);
		if (focusableElements.length === 0) return;

		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		if (event.key === "Tab") {
			if (event.shiftKey && document.activeElement === firstElement) {
				event.preventDefault();
				lastElement.focus();
			} else if (!event.shiftKey && document.activeElement === lastElement) {
				event.preventDefault();
				firstElement.focus();
			}
		}
	}

	function toggleNav() {
		const isActive = menu.classList.toggle("active");
		menuButton.classList.toggle("active");
		body.classList.toggle("active");

		if (isActive) {
			menu.setAttribute("aria-hidden", "false");
			const focusableElements = getFocusableElements(menu, menuButton);
			if (focusableElements.length) focusableElements[0].focus();

			// Use a single persistent event listener
			document.addEventListener("keydown", trapNavFocus);
		} else {
			menu.setAttribute("aria-hidden", "true");
			menuButton.focus();
			document.removeEventListener("keydown", trapNavFocus);
		}
	}

	function trapNavFocus(event) {
		trapFocus(event, menu, menuButton);
	}

	function toggleSearchDrawer() {
		const isActive = searchDrawer.classList.toggle("active");
		searchButton.classList.toggle("active");
		closeButton.classList.toggle("active");
		body.classList.toggle("active");

		if (isActive) {
			searchDrawer.setAttribute("aria-hidden", "false");

			// Ensure input gets focus after UI changes
			setTimeout(() => {
				if (searchInput) searchInput.focus();
			}, 10);

			document.addEventListener("keydown", trapSearchFocus);
		} else {
			searchDrawer.setAttribute("aria-hidden", "true");
			searchButton.focus();
			document.removeEventListener("keydown", trapSearchFocus);
		}
	}

	function trapSearchFocus(event) {
		trapFocus(event, searchDrawer);
	}

	// Attach click event to the buttons
	menuButton.addEventListener("click", toggleNav);
	searchButton.addEventListener("click", toggleSearchDrawer);
	closeButton.addEventListener("click", toggleSearchDrawer);

	// Attach Escape key event to the document
	document.addEventListener("keydown", function (event) {
		if (event.key === "Escape" && menu.classList.contains("active")) {
			toggleNav();
		} else if (event.key === "Escape" && searchDrawer.classList.contains("active")) {
			toggleSearchDrawer();
		}
	});

	// Sidebar Dropdown
	const dropButton = document.querySelector(".dropdown-button");
	const dropMenu = document.querySelector(".dropdown-menu");

	if (dropButton) {
		dropButton.addEventListener("click", function () {
			dropMenu.classList.toggle("active");
		});
	}

	// Animate CSS transitions
	const observerOptions = {
		root: null, // Use the viewport as the container
		rootMargin: "0px",
		threshold: 0.25, // Trigger when 20% of the element is visible
	};

	const animateOnScroll = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const target = entry.target;
				const animation = target.getAttribute("data-animation");
				if (animation) {
					target.classList.add(animation);
				}

				// Optional: Remove the observer after the animation is triggered
				observer.unobserve(target);
			}
		});
	};

	const observer = new IntersectionObserver(animateOnScroll, observerOptions);

	// Attach observer to each element
	const elements = document.querySelectorAll(".animate__animated");
	elements.forEach((el) => observer.observe(el));

	// Slider
	const sliderItems = document.querySelectorAll(".slider-item");
	const next = document.querySelector(".slide-next");
	const prev = document.querySelector(".slide-prev");
	const currentSpan = document.querySelector(".slider-meta span:first-child");
	const totalSpan = document.querySelector(".slider-meta span:last-child");
	const slider = document.querySelector(".slider");

	if (!slider) return;

	let currentIndex = 0;
	const totalSlides = sliderItems.length;

	function updateSlider(index) {
		sliderItems.forEach((slide, i) => {
			slide.classList.toggle("active", i === index);
			slide.setAttribute("aria-label", `Slide ${i + 1} of ${totalSlides}`);
			slide.setAttribute("aria-hidden", i !== index);
		});
		currentSpan.textContent = index + 1;
	}

	function showNext() {
		currentIndex = (currentIndex + 1) % totalSlides;
		updateSlider(currentIndex);
	}

	function showPrev() {
		currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
		updateSlider(currentIndex);
	}

	next.addEventListener("click", showNext);
	prev.addEventListener("click", showPrev);

	slider.addEventListener("keydown", (e) => {
		if (e.key === "ArrowRight") {
			showNext();
		} else if (e.key === "ArrowLeft") {
			showPrev();
		}
	});

	// Initialize
	totalSpan.textContent = totalSlides;
	updateSlider(currentIndex);
});
