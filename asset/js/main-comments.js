const swiper = new Swiper(".main-comments-swiper", {
  loop: true,
  spaceBetween: 40,
  centeredSlides: true,
  autoplay: {
    delay: 5000, // تایمر ۳ ثانیه‌ای
    disableOnInteraction: true, // ادامه تایمر حتی با تعامل کاربر
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".main-comments-arrow-left",
    prevEl: ".main-comments-arrow-right",
  },
});
