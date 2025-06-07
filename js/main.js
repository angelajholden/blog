document.addEventListener("DOMContentLoaded", () => {
	// ===== Development Cache Buster =====
	const bustDevCache = () => {
		const linkRelStyle = document.querySelectorAll('link[rel="stylesheet"]');
		linkRelStyle.forEach((link) => {
			const href = link.getAttribute("href");
			const hasQuery = href.includes("?");
			const randomVersion = Math.floor(Math.random() * 100000);
			const newHref = hasQuery ? `${href}&devcache=${randomVersion}` : `${href}?devcache=${randomVersion}`;
			link.setAttribute("href", newHref);
		});
	};

	bustDevCache();

	// ===== Highlight Current Nav Link =====
	const setActiveNavLink = () => {
		const links = document.querySelectorAll(".nav_link");
		const href = window.location.href;
		links.forEach((link) => {
			if (link.href === href) {
				link.classList.add("active");
			}
		});
	};

	setActiveNavLink();

	// ===== Focus Utilities =====
	const getFocusableElements = (container, includeExtra = null) => {
		let elements = [...container.querySelectorAll('a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])')].filter((el) => !el.hasAttribute("disabled"));
		if (includeExtra) elements.unshift(includeExtra);
		return elements;
	};

	const trapFocus = (event, container, includeExtra = null) => {
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
	};

	// ===== Menu Toggle =====
	const menuButton = document.querySelector(".button_menu");
	const menu = document.querySelector(".mobile_off_canvas");
	const body = document.body;

	const toggleNav = () => {
		const isActive = menu.classList.toggle("active");
		menuButton.classList.toggle("active");
		body.classList.toggle("active");

		if (isActive) {
			menu.setAttribute("aria-hidden", "false");
			const focusable = getFocusableElements(menu, menuButton);
			if (focusable.length) focusable[0].focus();
			document.addEventListener("keydown", trapNavFocus);
		} else {
			menu.setAttribute("aria-hidden", "true");
			menuButton.focus();
			document.removeEventListener("keydown", trapNavFocus);
		}
	};

	const trapNavFocus = (e) => trapFocus(e, menu, menuButton);

	menuButton?.addEventListener("click", toggleNav);

	// ===== Search Drawer =====
	const searchButton = document.querySelector(".button_search");
	const closeButton = document.querySelector(".button_close");
	const searchDrawer = document.querySelector(".search_drawer");
	const searchInput = document.querySelector(".search_input");

	const toggleSearchDrawer = () => {
		const isActive = searchDrawer.classList.toggle("active");
		searchButton.classList.toggle("active");
		closeButton.classList.toggle("active");
		body.classList.toggle("active");

		if (isActive) {
			searchDrawer.setAttribute("aria-hidden", "false");
			setTimeout(() => searchInput?.focus(), 10);
			document.addEventListener("keydown", trapSearchFocus);
		} else {
			searchDrawer.setAttribute("aria-hidden", "true");
			searchButton.focus();
			document.removeEventListener("keydown", trapSearchFocus);
		}
	};

	const trapSearchFocus = (e) => trapFocus(e, searchDrawer);

	searchButton?.addEventListener("click", toggleSearchDrawer);
	closeButton?.addEventListener("click", toggleSearchDrawer);

	// ===== Escape Key Handling =====
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			if (menu.classList.contains("active")) toggleNav();
			if (searchDrawer.classList.contains("active")) toggleSearchDrawer();
		}
	});

	// ===== Dropdown Menu =====
	const dropButton = document.querySelector(".dropdown-button");
	const dropMenu = document.querySelector(".dropdown-menu");
	dropButton?.addEventListener("click", () => dropMenu.classList.toggle("active"));

	// ===== Scroll Animations =====
	const setupScrollAnimations = () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const animation = entry.target.getAttribute("data-animation");
						if (animation) entry.target.classList.add(animation);
						obs.unobserve(entry.target);
					}
				});
			},
			{
				root: null,
				rootMargin: "0px",
				threshold: 0.25,
			}
		);

		document.querySelectorAll(".animate__animated").forEach((el) => observer.observe(el));
	};

	setupScrollAnimations();

	// ===== Slider =====
	const slider = document.querySelector(".slider");
	const sliderItems = document.querySelectorAll(".slider-item");
	const next = document.querySelector(".slide-next");
	const prev = document.querySelector(".slide-prev");
	const currentSpan = document.querySelector(".slider-meta span:first-child");
	const totalSpan = document.querySelector(".slider-meta span:last-child");

	if (slider && sliderItems.length) {
		let currentIndex = 0;
		const totalSlides = sliderItems.length;

		const updateSlider = (index) => {
			sliderItems.forEach((slide, i) => {
				slide.classList.toggle("active", i === index);
				slide.setAttribute("aria-label", `Slide ${i + 1} of ${totalSlides}`);
				slide.setAttribute("aria-hidden", i !== index);
			});
			currentSpan.textContent = index + 1;
		};

		const showNext = () => {
			currentIndex = (currentIndex + 1) % totalSlides;
			updateSlider(currentIndex);
		};

		const showPrev = () => {
			currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
			updateSlider(currentIndex);
		};

		next?.addEventListener("click", showNext);
		prev?.addEventListener("click", showPrev);

		slider.addEventListener("keydown", (e) => {
			if (e.key === "ArrowRight") showNext();
			if (e.key === "ArrowLeft") showPrev();
		});

		totalSpan.textContent = totalSlides;
		updateSlider(currentIndex);
	}
});
