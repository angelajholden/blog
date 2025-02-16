document.addEventListener("DOMContentLoaded", function () {
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
			document.body.style.overflow = "hidden";
			const focusableElements = getFocusableElements(menu, menuButton);
			if (focusableElements.length) focusableElements[0].focus();

			// Use a single persistent event listener
			document.addEventListener("keydown", trapNavFocus);
		} else {
			menu.setAttribute("aria-hidden", "true");
			document.body.style.overflow = "";
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
			document.body.style.overflow = "hidden";

			// Ensure input gets focus after UI changes
			setTimeout(() => {
				if (searchInput) searchInput.focus();
			}, 10);

			document.addEventListener("keydown", trapSearchFocus);
		} else {
			searchDrawer.setAttribute("aria-hidden", "true");
			document.body.style.overflow = "";
			searchButton.focus();
			document.removeEventListener("keydown", trapSearchFocus);
		}
	}

	function trapSearchFocus(event) {
		trapFocus(event, searchDrawer);
	}

	menuButton.addEventListener("click", toggleNav);
	menu.addEventListener("keydown", function (event) {
		if (event.key === "Escape") toggleNav();
	});

	searchButton.addEventListener("click", toggleSearchDrawer);
	closeButton.addEventListener("click", toggleSearchDrawer);
	searchDrawer.addEventListener("keydown", function (event) {
		if (event.key === "Escape") toggleSearchDrawer();
	});
});
