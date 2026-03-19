document.addEventListener("DOMContentLoaded", function () {
  var splide = new Splide("#offers-slider", {
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
  });

  // mount اسلایدر
  splide.mount();

  // گرفتن دکمه‌های سفارشی
  const prevBtn = document.querySelector(".offers-slider-arrow-right");
  const nextBtn = document.querySelector(".offers-slider-arrow-left");

  // اضافه کردن event listener برای دکمه‌ها
  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      splide.go("<");
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      splide.go(">");
    });
  }

  // به‌روزرسانی وضعیت دکمه‌ها هنگام تغییر اسلاید
  splide.on("moved", function () {
    updateButtonStates();
  });

  // تابع برای به‌روزرسانی وضعیت دکمه‌ها
  function updateButtonStates() {
    const index = splide.index;
    const length = splide.length;

    if (prevBtn) {
      prevBtn.disabled = index === 0;
    }

    if (nextBtn) {
      nextBtn.disabled = index >= length - splide.options.perPage;
    }
  }

  // مقداردهی اولیه وضعیت دکمه‌ها
  updateButtonStates();
});
