function startSlideshow() {
	// 獲取所有輪播圖片
	const slides = document.querySelectorAll(".slide");
	// 當前顯示的圖片索引
	let currentSlide = 0;

	// timer，every x s change a img
	setInterval(() => {
		// remove now active type
		slides[currentSlide].classList.remove("active");
		// cal next img 索引（%運算確保索引loop from 0-2）
		currentSlide = (currentSlide + 1) % slides.length;
		// next img add active type
		slides[currentSlide].classList.add("active");
	}, 3000); // 3000毫秒 = 3秒
}

function startSlideshow() {
	const slides = document.querySelectorAll(".slide");
	const dots = document.querySelectorAll(".dot");
	const prevBtn = document.querySelector(".prev-btn");
	const nextBtn = document.querySelector(".next-btn");
	let currentSlide = 0;
	let slideInterval;

	// 顯示狀態的函數
	function updateSlides() {
		// 輪播圖
		slides.forEach((slide) => slide.classList.remove("active"));
		slides[currentSlide].classList.add("active");

		// 指示器
		dots.forEach((dot) => dot.classList.remove("active"));
		dots[currentSlide].classList.add("active");
	}

	// 重置定時器
	function resetInterval() {
		clearInterval(slideInterval);
		slideInterval = setInterval(nextSlide, 2000);
	}

	// 下一張圖片函數
	function nextSlide() {
		currentSlide = (currentSlide + 1) % slides.length;
		updateSlides();
	}

	// 上一張圖片函數
	function prevSlide() {
		currentSlide = (currentSlide - 1 + slides.length) % slides.length;
		updateSlides();
	}

	//  綁定導航按鈕
	nextBtn.addEventListener("click", () => {
		nextSlide();
		resetInterval();
	});

	prevBtn.addEventListener("click", () => {
		prevSlide();
		resetInterval();
	});

	// 指示器點擊事件
	dots.forEach((dot, index) => {
		dot.addEventListener("click", () => {
			currentSlide = index;
			updateSlides();
			resetInterval();
		});
	});

	// 啟動自動輪播
	slideInterval = setInterval(nextSlide, 2000);
}

document.addEventListener("DOMContentLoaded", startSlideshow);
