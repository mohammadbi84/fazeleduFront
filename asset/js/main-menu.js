function initMainMenu() {
  let mainMenu = document.querySelector(".main-menu");

  const categoryMenu = document.getElementById("categoryMenu");
  const Bookmark = document.getElementById("bookmark");
  if (Bookmark && Bookmark.classList.contains("expanded")) {
    mainMenu.classList.add("with-bookmark");
  }

  if (mainMenu && !mainMenu.classList.contains("small")) {
    //region: make main-menu width same as search-bar width
    let screenWidth = document.body.clientWidth;
    let cart_dropdown = document.querySelector(".cart-dropdown");
    let favorites_dropdown = document.querySelector(".favorites-dropdown");
    let compare_dropdown = document.querySelector(".compare-dropdown");
    let categoriesMenu = document.querySelector("#categoryMenu");
    let containerParentWidth = document.querySelector("#test_container");

    setCssVar(
      "--main-menu-margin",
      `${(screenWidth - containerParentWidth.clientWidth) / 2 + 12}px`,
    );

    //endregion: make main-menu width same as search-bar width

    const scrollOffset = Bookmark?.clientHeight ?? 64;

    function scrollFunction(e) {
      if (
        document.body.scrollTop > scrollOffset || // For Safari
        document.documentElement.scrollTop > scrollOffset // For Chrome, Firefox, IE and Opera
      ) {
        mainMenu.classList.add("small");
        categoryMenu.classList.add("small");
        if (favorites_dropdown) {
          favorites_dropdown.style.top = "65px";
          favorites_dropdown.style.left = "14px";
        }
        cart_dropdown.style.left = "14px";
        compare_dropdown.style.left = "14px";
        compare_dropdown.style.top = "65px";
        cart_dropdown.style.top = "65px";
        categoriesMenu.style.top = "65px";
        categoriesMenu.style.left = "14px";
        categoriesMenu.style.right = "14px";

        if (Bookmark && Bookmark.classList.contains("expanded")) {
          mainMenu.classList.add("smallBookmark");
        }
        mainMenu.classList.remove("rounded-3");
      } else {
        mainMenu.classList.remove("small");
        categoryMenu.classList.remove("small");
        if (favorites_dropdown) {
          favorites_dropdown.style.top = "75px";
          favorites_dropdown.style.left = "0";
        }
        cart_dropdown.style.left = "0";
        compare_dropdown.style.left = "0";
        cart_dropdown.style.top = "75px";
        compare_dropdown.style.top = "75px";
        categoriesMenu.style.top = "75px";
        categoriesMenu.style.left = "0";
        categoriesMenu.style.right = "0";

        if (Bookmark && Bookmark.classList.contains("expanded")) {
          mainMenu.classList.remove("smallBookmark");
        }
        mainMenu.classList.add("rounded-3");
      }
    }

    window.addEventListener("scroll", scrollFunction);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  initMainMenu();
});
function setCssVar(name, value) {
  document.documentElement.style.setProperty(name, value);
}

document.addEventListener("DOMContentLoaded", function () {
  const categoryTrigger = document.getElementById("categoryTrigger");
  const categoryMenu = document.getElementById("categoryMenu");
  const overlay = document.getElementById("overlay");
  let menuTimeout;

  // باز کردن منو با هاور (دسکتاپ)
  categoryTrigger.addEventListener("mouseenter", function () {
    clearTimeout(menuTimeout);
    categoryMenu.classList.add("active");
  });

  // بستن منو وقتی هاور برداشته شد (دسکتاپ)
  categoryTrigger.addEventListener("mouseleave", function () {
    menuTimeout = setTimeout(function () {
      if (!categoryMenu.matches(":hover")) {
        categoryMenu.classList.remove("active");
      }
    }, 100);
  });

  // نگه داشتن منو وقتی هاور روی آن است (دسکتاپ)
  categoryMenu.addEventListener("mouseenter", function () {
    clearTimeout(menuTimeout);
  });

  // بستن منو وقتی هاور از روی آن برداشته شد (دسکتاپ)
  categoryMenu.addEventListener("mouseleave", function () {
    menuTimeout = setTimeout(function () {
      categoryMenu.classList.remove("active");
    }, 200);
  });
});

// مدیریت انتخاب زبان
document.addEventListener("DOMContentLoaded", function () {
  const languageSelectors = document.querySelectorAll(".language-selector");

  languageSelectors.forEach((selector) => {
    const btn = selector.querySelector(".language-btn");
    const langSpan = btn.querySelector(".current-language");
    // کلیک روی دکمه
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      lang = btn.dataset.lang;
      window.location = "/change-lang/" + lang;
      selector.classList.toggle("active");
      btn.classList.toggle("active");
      langSpan.textContent = langSpan.textContent === "Fa" ? "En" : "Fa";
    });
  });
});

// مدیریت هاور روی سبد خرید
let cartTimeout;
$(".cart-container").hover(
  function () {
    clearTimeout(cartTimeout);
    $(".cart-dropdown").css({
      opacity: "1",
      visibility: "visible",
      transform: "translateY(0)",
    });
  },
  function () {
    cartTimeout = setTimeout(function () {
      $(".cart-dropdown").css({
        opacity: "0",
        visibility: "hidden",
        transform: "translateY(10px)",
      });
    }, 200);
  },
);
// جلوگیری از بستن وقتی هاور روی منو است
$(".cart-dropdown").hover(
  function () {
    clearTimeout(cartTimeout);
  },
  function () {
    cartTimeout = setTimeout(function () {
      $(".cart-dropdown").css({
        opacity: "0",
        visibility: "hidden",
        transform: "translateY(10px)",
      });
    }, 200);
  },
);
let compareTimeout;
$(".compare-container").hover(
  function () {
    clearTimeout(compareTimeout);
    $(".compare-dropdown").css({
      opacity: "1",
      visibility: "visible",
      transform: "translateY(0)",
    });
  },
  function () {
    compareTimeout = setTimeout(function () {
      $(".compare-dropdown").css({
        opacity: "0",
        visibility: "hidden",
        transform: "translateY(10px)",
      });
    }, 200);
  },
);
// جلوگیری از بستن وقتی هاور روی منو است
$(".compare-dropdown").hover(
  function () {
    clearTimeout(compareTimeout);
  },
  function () {
    compareTimeout = setTimeout(function () {
      $(".compare-dropdown").css({
        opacity: "0",
        visibility: "hidden",
        transform: "translateY(10px)",
      });
    }, 200);
  },
);
let favoritesTimeout;
$(".favorites-container").hover(
  function () {
    clearTimeout(favoritesTimeout);
    $(".favorites-dropdown").css({
      opacity: "1",
      visibility: "visible",
      transform: "translateY(0)",
    });
  },
  function () {
    favoritesTimeout = setTimeout(function () {
      $(".favorites-dropdown").css({
        opacity: "0",
        visibility: "hidden",
        transform: "translateY(10px)",
      });
    }, 200);
  },
);
// جلوگیری از بستن وقتی هاور روی منو است
$(".favorites-dropdown").hover(
  function () {
    clearTimeout(favoritesTimeout);
  },
  function () {
    favoritesTimeout = setTimeout(function () {
      $(".favorites-dropdown").css({
        opacity: "0",
        visibility: "hidden",
        transform: "translateY(10px)",
      });
    }, 200);
  },
);
