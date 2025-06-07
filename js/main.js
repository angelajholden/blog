// Clean, modular JavaScript entry point
import { NavMenu } from './modules/navMenu.js';
import { SearchDrawer } from './modules/searchDrawer.js';
import { Dropdown } from './modules/dropdown.js';
import { Slider } from './modules/slider.js';
import { setupScrollAnimations } from './modules/scrollAnimations.js';

document.addEventListener("DOMContentLoaded", () => {
	// Initialize all modules
	const navMenu = new NavMenu();
	const searchDrawer = new SearchDrawer();
	const dropdown = new Dropdown();
	const slider = new Slider();
	
	// Setup scroll animations
	setupScrollAnimations();

	// Global escape key handling
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			navMenu.close();
			searchDrawer.close();
		}
	});
});
