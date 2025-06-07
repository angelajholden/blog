// Focus utilities for accessibility and keyboard navigation
export const getFocusableElements = (container, includeExtra = null) => {
	let elements = [...container.querySelectorAll('a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])')].filter((el) => !el.hasAttribute("disabled"));
	if (includeExtra) elements.unshift(includeExtra);
	return elements;
};

export const trapFocus = (event, container, includeExtra = null) => {
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
