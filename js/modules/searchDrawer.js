// Search drawer functionality
import { trapFocus } from '../utils/focus.js';

export class SearchDrawer {
	constructor() {
		this.searchButton = document.querySelector(".button_search");
		this.closeButton = document.querySelector(".button_close");
		this.searchDrawer = document.querySelector(".search_drawer");
		this.searchInput = document.querySelector(".search_input");
		this.body = document.body;
		this.init();
	}

	init() {
		this.searchButton?.addEventListener("click", () => this.toggle());
		this.closeButton?.addEventListener("click", () => this.toggle());
	}

	toggle() {
		const isActive = this.searchDrawer.classList.toggle("active");
		this.searchButton.classList.toggle("active");
		this.closeButton.classList.toggle("active");
		this.body.classList.toggle("active");

		if (isActive) {
			this.searchDrawer.setAttribute("aria-hidden", "false");
			setTimeout(() => this.searchInput?.focus(), 10);
			document.addEventListener("keydown", this.trapSearchFocus);
		} else {
			this.searchDrawer.setAttribute("aria-hidden", "true");
			this.searchButton.focus();
			document.removeEventListener("keydown", this.trapSearchFocus);
		}
	}

	trapSearchFocus = (e) => trapFocus(e, this.searchDrawer);

	close() {
		if (this.searchDrawer.classList.contains("active")) {
			this.toggle();
		}
	}
}
