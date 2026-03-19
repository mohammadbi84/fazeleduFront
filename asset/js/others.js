document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("categoriesRow");
  const scrollRight = document.getElementById("scrollRight");
  const scrollLeft = document.getElementById("scrollLeft");

  // مقدار اسکرول برای هر کلیک
  const scrollAmount = 200;

  // اسکرول به راست (در RTL برعکس عمل می‌کنه)
  scrollRight.addEventListener("click", function () {
    // در RTL برای رفتن به راست، باید اسکرول منفی بدیم
    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  });

  // اسکرول به چپ (در RTL برعکس عمل می‌کنه)
  scrollLeft.addEventListener("click", function () {
    // در RTL برای رفتن به چپ، باید اسکرول مثبت بدیم
    container.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  });

  // آپدیت وضعیت دکمه‌ها برای RTL
  function updateButtons() {
    // بدست آوردن موقعیت اسکرول با در نظر گرفتن RTL
    const maxScroll = container.scrollWidth - container.clientWidth;
    const currentScroll = Math.abs(container.scrollLeft); // برای RTL مقدار منفی رو مثبت می‌کنیم

    // بررسی برای دکمه چپ (رفتن به چپ - در RTL یعنی رفتن به انتهای لیست)
    if (currentScroll >= maxScroll - 1) {
      scrollLeft.disabled = true;
    } else {
      scrollLeft.disabled = false;
    }

    // بررسی برای دکمه راست (رفتن به راست - در RTL یعنی رفتن به ابتدای لیست)
    if (currentScroll <= 0) {
      scrollRight.disabled = true;
    } else {
      scrollRight.disabled = false;
    }
  }

  // اضافه کردن Event Listener برای اسکرول
  container.addEventListener("scroll", updateButtons);

  // چک کردن اولیه
  updateButtons();

  // آپدیت هنگام تغییر سایز پنجره
  window.addEventListener("resize", updateButtons);

  // آپشنال: اضافه کردن قابلیت اسکرول با موس ویل
  container.addEventListener("wheel", function (e) {
    if (e.deltaY !== 0) {
      e.preventDefault();
      container.scrollBy({
        left: e.deltaY > 0 ? -scrollAmount / 2 : scrollAmount / 2,
        behavior: "smooth",
      });
    }
  });
});
