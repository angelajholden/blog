// Slider functionality
export class Slider {
	constructor() {
		this.slider = document.querySelector(".slider");
		this.sliderItems = document.querySelectorAll(".slider-item");
		this.next = document.querySelector(".slide-next");
		this.prev = document.querySelector(".slide-prev");
		this.currentSpan = document.querySelector(".slider-meta span:first-child");
		this.totalSpan = document.querySelector(".slider-meta span:last-child");
		this.currentIndex = 0;
		this.totalSlides = this.sliderItems.length;
		this.init();
	}

	init() {
		if (!this.slider || !this.sliderItems.length) return;

		this.next?.addEventListener("click", () => this.showNext());
		this.prev?.addEventListener("click", () => this.showPrev());

		this.slider.addEventListener("keydown", (e) => {
			if (e.key === "ArrowRight") this.showNext();
			if (e.key === "ArrowLeft") this.showPrev();
		});

		this.totalSpan.textContent = this.totalSlides;
		this.updateSlider(this.currentIndex);
	}

	updateSlider(index) {
		this.sliderItems.forEach((slide, i) => {
			slide.classList.toggle("active", i === index);
			slide.setAttribute("aria-label", `Slide ${i + 1} of ${this.totalSlides}`);
			slide.setAttribute("aria-hidden", i !== index);
		});
		this.currentSpan.textContent = index + 1;
	}

	showNext() {
		this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
		this.updateSlider(this.currentIndex);
	}

	showPrev() {
		this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
		this.updateSlider(this.currentIndex);
	}
}
