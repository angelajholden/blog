document.addEventListener("DOMContentLoaded", function () {
	const button = document.querySelector(".button_menu");
	const menu = document.querySelector(".mobile_off_canvas");
	const body = document.querySelector("body");

	// when we click the button, add an active class to the button
	// and add an active class to the menu
	button.addEventListener("click", function () {
		menu.classList.toggle("active");
		button.classList.toggle("active");
		body.classList.toggle("active");
	});
});
