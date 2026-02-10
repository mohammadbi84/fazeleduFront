let bookmarkSwiper;
const bookmarkToggle = document.getElementById("bookmarkToggle");
const BookmarkMenu = document.getElementById("bookmark");
const bookmark_container = document.getElementById("bookmark_container");
// const BookmarkMenuSlider = document.getElementById("bookmarkSlider");
let mainMenu = document.querySelector(".main-menu");

document.addEventListener("DOMContentLoaded", function () {
  // bookmarkSwiper = new Swiper("#bookmarkSlider", {
  //   loop: true,
  //   speed: 600,
  //   effect: "fade",
  //   fadeEffect: {
  //     crossFade: true,
  //   },
  //   autoplay: {
  //     delay: 3000,
  //     disableOnInteraction: false,
  //   },
  //   pagination: false,
  //   watchOverflow: false,
  //   on: {
  //     init() {
  //       handleSlideData(this);
  //     },
  //     slideChangeTransitionEnd() {
  //       handleSlideData(this);
  //     },
  //   },
  // });
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
    bookmark_container.style.display = "none";
    mainMenu.classList.remove("with-bookmark", "smallBookmark");
    setCssVar("--bookmark-height", `5px`);
    // توقف اسلایدر
    // bookmarkSwiper.autoplay.stop();
  } else {
    // باز کردن
    BookmarkMenu.classList.remove("collapsed");
    BookmarkMenu.classList.add("expanded");
    bookmark_container.style.display = "block";
    setCssVar("--bookmark-height", `65px`);

    mainMenu.classList.add("with-bookmark", "smallBookmark");
    bookmarkToggle.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';

    // راه‌اندازی مجدد اسلایدر
    // bookmarkSwiper.autoplay.start();
  }
}

// افزودن رویداد کلیک به دکمه بوکمارک
bookmarkToggle.addEventListener("click", toggleBookmark);

document.addEventListener("DOMContentLoaded", function () {
  // Sample stories data
  const stories = [
    {
      id: 1,
      username: "travel_lover",
      profileImg: "https://randomuser.me/api/portraits/women/44.jpg",
      content: [
        {
          type: "image",
          url: "https://source.unsplash.com/random/600x800/?mountain",
          duration: 5,
        },
      ],
      time: "2h ago",
    },
    {
      id: 2,
      username: "foodie_adventures",
      profileImg: "https://randomuser.me/api/portraits/men/32.jpg",
      content: [
        {
          type: "image",
          url: "https://source.unsplash.com/random/600x800/?restaurant",
          duration: 5,
        },
      ],
      time: "1h ago",
    },
    {
      id: 3,
      username: "fitness_guru",
      profileImg: "https://randomuser.me/api/portraits/women/65.jpg",
      content: [
        {
          type: "image",
          url: "https://source.unsplash.com/random/600x800/?gym",
          duration: 5,
        },
      ],
      time: "4h ago",
    },
    {
      id: 4,
      username: "tech_geek",
      profileImg: "https://randomuser.me/api/portraits/men/75.jpg",
      content: [
        {
          type: "video",
          url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4",
          duration: 20,
        },
      ],
      time: "6h ago",
    },
    {
      id: 5,
      username: "fashion_icon",
      profileImg: "https://randomuser.me/api/portraits/women/85.jpg",
      content: [
        {
          type: "image",
          url: "https://source.unsplash.com/random/600x800/?model",
          duration: 5,
        },
      ],
      time: "3h ago",
    },
    {
      id: 6,
      username: "pet_lover",
      profileImg: "https://randomuser.me/api/portraits/women/22.jpg",
      content: [
        {
          type: "image",
          url: "https://source.unsplash.com/random/600x800/?cat",
          duration: 5,
        },
      ],
      time: "5h ago",
    },
    {
      id: 7,
      username: "music_producer",
      profileImg: "https://randomuser.me/api/portraits/men/45.jpg",
      content: [
        {
          type: "video",
          url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_4mb.mp4",
          duration: 18,
        },
      ],
      time: "8h ago",
    },
  ];

  // Initialize stories slider
  const storiesSlider = new Splide("#stories-slider", {
    type: "slide",
    perPage: 23,
    perMove: 1,
    gap: "15px",
    pagination: false,
    arrows: true,
    padding: "14px",
    // direction: 'rtl',
    breakpoints: {
      992: {
        perPage: 5,
      },
      768: {
        perPage: 6,
      },
      576: {
        perPage: 6,
      },
    },
  });

  // Add story items to slider
  const storiesList = document.querySelector(".splide__list");
  stories.forEach((story) => {
    const storyItem = document.createElement("li");
    storyItem.className = "splide__slide";
    storyItem.innerHTML = `
                <div class="story-item" data-story-id="${story.id}">
                    <img src="${story.profileImg}" alt="${story.username}">
                </div>
            `;
    storiesList.appendChild(storyItem);
  });

  storiesSlider.mount();

  // Story modal variables
  const storyModal = new bootstrap.Modal(document.getElementById("storyModal"));
  let currentStoryIndex = 0;
  let currentContentIndex = 0;
  let progressInterval;
  let currentProgress = 0;
  let isPaused = false;

  // Open story when clicked
  document.querySelectorAll(".story-item").forEach((item, index) => {
    item.addEventListener("click", () => {
      currentStoryIndex = index;
      currentContentIndex = 0;
      openStory();
    });
  });

  // Open story function
  function openStory() {
    const story = stories[currentStoryIndex];

    // Update modal header
    document.querySelector(".story-profile-img").src = story.profileImg;
    document.querySelector(".username").textContent = story.username;
    document.querySelector(".time").textContent = story.time;

    // Reset progress bars
    resetProgressBars(story.content.length);

    // Show first content
    showStoryContent(story.content[0]);

    // Start progress
    startProgress(story.content[0].duration);

    // Open modal
    storyModal.show();
  }

  // Show story content (image or video)
  function showStoryContent(content) {
    const storyContent = document.querySelector(".story-content");
    storyContent.innerHTML = "";

    if (content.type === "image") {
      const img = document.createElement("img");
      img.src = content.url;
      img.alt = "Story image";
      storyContent.appendChild(img);
    } else if (content.type === "video") {
      const video = document.createElement("video");
      video.src = content.url;
      video.controls = false;
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      video.addEventListener("click", togglePause);
      video.addEventListener("play", () => {
        if (isPaused) {
          isPaused = false;
          startProgress(content.duration - currentProgress);
        }
      });
      video.addEventListener("pause", () => {
        isPaused = true;
        clearInterval(progressInterval);
      });
      storyContent.appendChild(video);
    }
  }

  // Start progress bar animation
  function startProgress(duration) {
    clearInterval(progressInterval);
    currentProgress = 0;

    const progressFill =
      document.querySelectorAll(".progress-fill")[currentContentIndex];
    progressFill.style.width = "0%";

    const increment = 100 / (duration * 10);

    progressInterval = setInterval(() => {
      if (!isPaused) {
        currentProgress += increment;
        progressFill.style.width = `${currentProgress}%`;

        if (currentProgress >= 100) {
          clearInterval(progressInterval);
          nextContent();
        }
      }
    }, 100);
  }

  // Reset all progress bars
  function resetProgressBars(count) {
    const progressBars = document.querySelectorAll(".progress-bar");
    const progressFills = document.querySelectorAll(".progress-fill");

    // Hide all progress bars first
    progressBars.forEach((bar) => (bar.style.display = "none"));

    // Show only needed bars and reset them
    for (let i = 0; i < count; i++) {
      progressBars[i].style.display = "block";
      progressFills[i].style.width = "0%";
    }
  }

  // Go to next content in current story
  function nextContent() {
    const story = stories[currentStoryIndex];
    currentContentIndex++;

    if (currentContentIndex < story.content.length) {
      showStoryContent(story.content[currentContentIndex]);
      startProgress(story.content[currentContentIndex].duration);
    } else {
      nextStory();
    }
  }

  // Go to next story
  function nextStory() {
    currentStoryIndex++;
    if (currentStoryIndex >= stories.length) {
      currentStoryIndex = 0;
    }
    currentContentIndex = 0;
    openStory();
  }

  // Go to previous story
  function prevStory() {
    currentStoryIndex--;
    if (currentStoryIndex < 0) {
      currentStoryIndex = stories.length - 1;
    }
    currentContentIndex = 0;
    openStory();
  }

  // Toggle pause/play
  function togglePause() {
    const storyContent = document.querySelector(".story-content");
    const video = storyContent.querySelector("video");

    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    } else {
      isPaused = !isPaused;
      if (isPaused) {
        clearInterval(progressInterval);
      } else {
        const story = stories[currentStoryIndex];
        startProgress(
          story.content[currentContentIndex].duration - currentProgress,
        );
      }
    }
  }

  // Modal event listeners
  document.querySelector(".next-story").addEventListener("click", nextStory);
  document.querySelector(".prev-story").addEventListener("click", prevStory);
  document
    .querySelector(".story-content")
    .addEventListener("click", togglePause);

  // Reset when modal is closed
  document
    .getElementById("storyModal")
    .addEventListener("hidden.bs.modal", () => {
      clearInterval(progressInterval);
      isPaused = false;
    });
});
