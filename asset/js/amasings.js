document.addEventListener("DOMContentLoaded", function () {
  var splide = new Splide("#amasings-slider", {
    direction: "rtl",
    perPage: 1,
    gap: "1rem",
    snap: true,
    arrows: false, // غیرفعال کردن arrows پیشفرض
    pagination: false, // غیرفعال کردن pagination پیشفرض
    breakpoints: {
      1200: {
        perPage: 1,
      },
      900: {
        perPage: 1,
      },
      600: {
        perPage: 1,
        focus: "center",
        gap: "0.6rem",
        fixedWidth: "calc(66.666% - 0.6rem)",
      },
    },
  }).mount();

  // مقداردهی اولیه Swiper
  const swiper = new Swiper(".amasings-thumb-slider", {
    slidesPerView: 4, // نمایش ۵ اسلاید همزمان
    spaceBetween: 25, // فاصله بین اسلایدها
    slidesPerGroup: 4, // حرکت دونه دونه (تک اسلاید)

    loop: true, // فعال کردن حالت چرخشی
    autoplay: {
      delay: 5000, // تایمر ۳ ثانیه‌ای
      disableOnInteraction: false, // ادامه تایمر حتی با تعامل کاربر
    },
    pagination: false,
    navigation: {
      nextEl: ".amasings-thumb-arrow-left",
      prevEl: ".amasings-thumb-arrow-right",
    },
    breakpoints: {
      // تنظیمات واکنش‌گرا برای موبایل
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
        slidesPerGroup: 4, // حرکت دونه دونه (تک اسلاید)
      },
    },
  });
});
