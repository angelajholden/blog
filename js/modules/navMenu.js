// Navigation menu functionality
import { getFocusableElements, trapFocus } from '../utils/focus.js';

export class NavMenu {
	constructor() {
		this.menuButton = document.querySelector(".button_menu");
		this.menu = document.querySelector(".mobile_off_canvas");
		this.body = document.body;
		this.init();
	}

	init() {
		this.menuButton?.addEventListener("click", () => this.toggle());
		this.setActiveNavLink();
	}

	setActiveNavLink() {
		const links = document.querySelectorAll(".nav_link");
		const href = window.location.href;
		links.forEach((link) => {
			if (link.href === href) {
				link.classList.add("active");
			}
		});
	}

	toggle() {
		const isActive = this.menu.classList.toggle("active");
		this.menuButton.classList.toggle("active");
		this.body.classList.toggle("active");

		if (isActive) {
			this.menu.setAttribute("aria-hidden", "false");
			const focusable = getFocusableElements(this.menu, this.menuButton);
			if (focusable.length) focusable[0].focus();
			document.addEventListener("keydown", this.trapNavFocus);
		} else {
			this.menu.setAttribute("aria-hidden", "true");
			this.menuButton.focus();
			document.removeEventListener("keydown", this.trapNavFocus);
		}
	}

	trapNavFocus = (e) => trapFocus(e, this.menu, this.menuButton);

	close() {
		if (this.menu.classList.contains("active")) {
			this.toggle();
		}
	}
}
