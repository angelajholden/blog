// Dropdown menu functionality
export class Dropdown {
	constructor() {
		this.dropButton = document.querySelector(".dropdown-button");
		this.dropMenu = document.querySelector(".dropdown-menu");
		this.init();
	}

	init() {
		this.dropButton?.addEventListener("click", () => this.toggle());
	}

	toggle() {
		this.dropMenu.classList.toggle("active");
	}
}
