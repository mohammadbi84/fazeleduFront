let bookmarkSwiper;
const bookmarkToggle = document.getElementById("bookmarkToggle");
const BookmarkMenu = document.getElementById("bookmark");
const BookmarkMenuSlider = document.getElementById("bookmarkSlider");
let mainMenu = document.querySelector(".main-menu");

document.addEventListener("DOMContentLoaded", function () {
  bookmarkSwiper = new Swiper("#bookmarkSlider", {
    loop: true,
    speed: 600,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: false,
    watchOverflow: false,
    on: {
      init() {
        handleSlideData(this);
      },
      slideChangeTransitionEnd() {
        handleSlideData(this);
      },
    },
  });
});

function handleSlideData(swiper) {
  let activeSlide = swiper.slides[swiper.activeIndex];
  let delay = activeSlide.dataset.delay;
  let height = activeSlide.dataset.height;

  if (height) {
    setCssVar("--bookmark-height", `${height}px`);
  }

  if (delay) {
    swiper.params.autoplay.delay = parseInt(delay);
    swiper.autoplay.start();
  }
}

function toggleBookmark() {
  if (BookmarkMenu.classList.contains("expanded")) {
    // جمع کردن
    BookmarkMenu.classList.remove("expanded");
    BookmarkMenu.classList.add("collapsed");
    BookmarkMenu.style.background = "var(--primary)";
    bookmarkToggle.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';

    mainMenu.classList.remove("with-bookmark", "smallBookmark");

    // توقف اسلایدر
    bookmarkSwiper.autoplay.stop();
  } else {
    // باز کردن
    BookmarkMenu.classList.remove("collapsed");
    BookmarkMenu.classList.add("expanded");

    mainMenu.classList.add("with-bookmark", "smallBookmark");
    bookmarkToggle.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';

    // راه‌اندازی مجدد اسلایدر
    bookmarkSwiper.autoplay.start();
  }
}

// افزودن رویداد کلیک به دکمه بوکمارک
bookmarkToggle.addEventListener("click", toggleBookmark);
