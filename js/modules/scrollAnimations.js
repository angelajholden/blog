// Scroll animations using Intersection Observer
export const setupScrollAnimations = () => {
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
