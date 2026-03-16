document.addEventListener("DOMContentLoaded", function () {
  const sliderContainer = document.querySelector(".top-slider");
  if (!sliderContainer) return;

  const slider = tns({
    container: ".top-slider",
    items: 1,
    slideBy: "page",
    loop: true,
    controls: false,
    nav: false,
    autoplay: false,
    speed: 500,
    rewind: true,
    mouseDrag: true, // فعال کردن قابلیت درگ با موس
    touch: true,
  });

  const slides = document.querySelectorAll(".top-slider .item");
  const paginationItems = document.querySelectorAll(".pagination-item");

  let timeoutId = null;
  let activeVideo = null;

  /* -------------------- اسلاید اتومات -------------------- */

  function playNextSlide() {
    if (activeVideo && !activeVideo.paused) return;

    clearTimeout(timeoutId);

    const info = slider.getInfo();
    const realIndex = info.displayIndex - 1; // مهم

    const currentSlide = slides[realIndex];
    const duration = parseInt(currentSlide.dataset.duration) || 5000;

    timeoutId = setTimeout(() => {
      slider.goTo("next");
    }, duration);
  }

  function stopAutoSlide() {
    clearTimeout(timeoutId);
  }

  /* -------------------- Pagination -------------------- */

  function updateActivePagination(index) {
    paginationItems.forEach((item) => item.classList.remove("active"));
    if (paginationItems[index]) {
      paginationItems[index].classList.add("active");
    }
  }

  paginationItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      stopAutoSlide();
      slider.goTo(index);
    });
  });

  /* -------------------- مدیریت ویدیو داخل اسلایدر -------------------- */

  const videoContainers = document.querySelectorAll(
    ".video-full-container-slider",
  );

  videoContainers.forEach((container) => {
    const video = container.querySelector(".slider-video");
    const playBtn = container.querySelector(".play-pause-btn");
    const icon = playBtn.querySelector("i");

    function toggleVideo() {
      if (video.paused) {
        // اگر ویدیوی دیگه‌ای در حال پخشه، ببندش
        if (activeVideo && activeVideo !== video) {
          activeVideo.pause();
        }

        stopAutoSlide();
        video.play();
        playBtn.classList.remove("d-flex");
        playBtn.classList.add("pause");
        icon.classList.remove("bi-play-fill");
        icon.classList.add("bi-pause-fill");
        container.classList.add("playing");
        activeVideo = video;

        const info = slider.getInfo();
        const realIndex = info.displayIndex - 1; // مهم
        const currentSlide = slides[realIndex];
        currentSlide
          .querySelector(".slider-box-container")
          .classList.add("d-none");
      } else {
        video.pause();
        icon.classList.remove("bi-pause-fill");
        icon.classList.add("bi-play-fill");
        playBtn.classList.add("d-flex");
        playBtn.classList.remove("pause");
        container.classList.remove("playing");
        activeVideo = null;

        const info = slider.getInfo();
        const realIndex = info.displayIndex - 1; // مهم
        const currentSlide = slides[realIndex];
        currentSlide
          .querySelector(".slider-box-container")
          .classList.remove("d-none");

        playNextSlide();
      }
    }

    playBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleVideo();
    });
    video.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleVideo();
    });

    container
      .querySelector(".video-overlay")
      .addEventListener("click", toggleVideo);

    video.addEventListener("ended", function () {
      icon.classList.remove("bi-pause-fill");
      icon.classList.add("bi-play-fill");
      container.classList.remove("playing");
      playBtn.classList.add("d-flex");
      playBtn.classList.remove("pause");

      activeVideo = null;
      const info = slider.getInfo();
      const realIndex = info.displayIndex - 1; // مهم
      const currentSlide = slides[realIndex];
      currentSlide
        .querySelector(".slider-box-container")
        .classList.remove("d-none");

      setTimeout(() => {
        slider.goTo("next");
      }, 2000);
    });
  });

  /* -------------------- وقتی اسلاید عوض شد -------------------- */

  slider.events.on("indexChanged", (info) => {
    clearTimeout(timeoutId);

    const realIndex = info.displayIndex - 1;

    updateActivePagination(realIndex);

    // ریست کامل هر ویدیویی که داخل اسلاید قبلی بوده
    document.querySelectorAll(".slider-video").forEach((v) => {
      v.pause();

      // ریست کامل برای برگشت poster
      const src = v.querySelector("source").getAttribute("src");
      v.removeAttribute("src");
      v.load();

      v.querySelector("source").setAttribute("src", src);
      v.load();
    });

    activeVideo = null;

    playNextSlide();
  });

  /* شروع اولیه */
  updateActivePagination(0);
  playNextSlide();
});
