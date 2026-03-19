// عناصر اصلی
const sliderContainer = document.getElementById("slider-container-o");
const slides = sliderContainer.querySelectorAll(".slide-o");
const controlsContainer = document.getElementById("slider-controls-o");
const podcastImage = document.getElementById("podcast-image-o");
const podcastVideo = document.getElementById("podcast-video-o");

let currentVideoControls = null;

// ایجاد دکمه‌های کنترل اسلاید (دات‌ها)
slides.forEach((_, index) => {
  const btn = document.createElement("button");
  btn.classList.add("control-btn-o");
  if (index === 0) btn.classList.add("active");

  btn.addEventListener("click", () => {
    sliderContainer.scrollTo({
      top: index * slides[0].offsetHeight,
      behavior: "smooth",
    });
    updateActiveControl(index);
  });

  controlsContainer.appendChild(btn);
});

// تابع آپدیت وضعیت دکمه‌های کنترل (active)
function updateActiveControl(activeIndex) {
  const buttons = controlsContainer.querySelectorAll(".control-btn-o");
  buttons.forEach((btn, i) => {
    btn.classList.toggle("active", i === activeIndex);
  });
}

// تابع قالب‌بندی زمان به فرمت دقیقه:ثانیه
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = String(Math.floor(seconds % 60)).padStart(2, "0");
  return `${mins}:${secs}`;
}

// ستاپ کنترلر ویدیو برای اسلاید فعلی
function setupVideoControls(slide) {
  if (currentVideoControls) {
    currentVideoControls.playBtn.removeEventListener(
      "click",
      currentVideoControls.playHandler,
    );
    currentVideoControls.volume.removeEventListener(
      "input",
      currentVideoControls.volumeHandler,
    );
    currentVideoControls.seekBar.removeEventListener(
      "input",
      currentVideoControls.seekHandler,
    );
    podcastVideo.removeEventListener(
      "timeupdate",
      currentVideoControls.timeUpdateHandler,
    );
    podcastVideo.removeEventListener(
      "ended",
      currentVideoControls.endedHandler,
    );
    podcastVideo.removeEventListener(
      "loadedmetadata",
      currentVideoControls.loadedMetadataHandler,
    );
  }

  const customPlayer = slide.querySelector(".custom-player-o");
  if (!customPlayer) return;

  const playBtn = customPlayer.querySelector(".play-btn-o");
  const playBtnIcon = playBtn.querySelector(".bi");
  const seekBar = customPlayer.querySelector(".seek-bar-o");
  const timeDisplay = customPlayer.querySelector(".time-o");
  const volume = customPlayer.querySelector(".volume-o");

  podcastVideo.volume = volume.value;

  const playHandler = () => {
    if (podcastVideo.paused) {
      document.querySelectorAll("audio").forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
        const btn = audio.closest(".slide-o")?.querySelector(".play-btn-o");
        if (btn) btn.classList.remove("pause");
        playBtnIcon.classList.remove("bi-pause-fill");
        playBtnIcon.classList.add("bi-play-fill");
      });

      podcastVideo
        .play()
        .then(() => {
          playBtn.classList.add("pause");
          playBtnIcon.classList.remove("bi-play-fill");
          playBtnIcon.classList.add("bi-pause-fill");
        })
        .catch((e) => console.error("خطا در پخش ویدیو:", e));
    } else {
      podcastVideo.pause();
      playBtn.classList.remove("pause");
      playBtnIcon.classList.remove("bi-pause-fill");
      playBtnIcon.classList.add("bi-play-fill");
    }
  };

  const volumeHandler = () => {
    podcastVideo.volume = volume.value;

    const min = volume.min;
    const max = volume.max;

    // محاسبه درصد مقدار فعلی
    const percentage = ((volume.value - min) * 100) / (max - min);

    volume.style.background = `linear-gradient(to right, var(--primary) 0%, var(--primary) ${percentage}%, #ddd ${percentage}%, #ddd 100%)`;
  };

  const seekHandler = () => {
    podcastVideo.currentTime = seekBar.value;
  };

  const timeUpdateHandler = () => {
    if (!isNaN(podcastVideo.duration)) {
      seekBar.max = podcastVideo.duration;
      seekBar.value = podcastVideo.currentTime;

      const current = formatTime(podcastVideo.currentTime);
      const total = formatTime(podcastVideo.duration);
      timeDisplay.textContent = `${total} / ${current}`;

      const min = seekBar.min;
      const max = seekBar.max;

      // محاسبه درصد مقدار فعلی
      const percentage = ((seekBar.value - min) * 100) / (max - min);

      seekBar.style.background = `linear-gradient(to right, var(--primary) 0%, var(--primary) ${percentage}%, #ddd ${percentage}%, #ddd 100%)`;
    }
  };

  const endedHandler = () => {
    playBtn.classList.remove("pause");
    playBtnIcon.classList.add("bi-play-fill");
    playBtnIcon.classList.remove("bi-pause-fill");
    podcastVideo.currentTime = 0;
    podcastVideo.load();
    seekBar.value = 0;
    seekBar.style.background = `linear-gradient(to right, var(--primary) 0%, var(--primary) 0%, #ddd 0%, #ddd 100%)`;
    timeDisplay.textContent = "0:00 / 0:00";
  };

  const loadedMetadataHandler = () => {
    if (!isNaN(podcastVideo.duration)) {
      seekBar.max = podcastVideo.duration;
      seekBar.value = 0;
      const total = formatTime(podcastVideo.duration);
      timeDisplay.textContent = `${total} / 0:00`;
    }
  };

  playBtn.addEventListener("click", playHandler);
  volume.addEventListener("input", volumeHandler);
  seekBar.addEventListener("input", seekHandler);
  podcastVideo.addEventListener("timeupdate", timeUpdateHandler);
  podcastVideo.addEventListener("ended", endedHandler);
  podcastVideo.addEventListener("loadedmetadata", loadedMetadataHandler);

  currentVideoControls = {
    playBtn,
    playBtnIcon,
    volume,
    seekBar,
    playHandler,
    volumeHandler,
    seekHandler,
    timeUpdateHandler,
    endedHandler,
    loadedMetadataHandler,
  };
}

// تابع برای آپدیت تصویر یا ویدیو بر اساس اسلاید فعلی
function updateOnScroll() {
  const index = Math.round(sliderContainer.scrollTop / slides[0].offsetHeight);
  const currentSlide = slides[index];
  if (!currentSlide) return;

  const type = currentSlide.getAttribute("data-type");

  // توقف همه صداها
  document.querySelectorAll("audio").forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
    const btn = audio.closest(".slide-o")?.querySelector(".play-btn-o");
    const btnIcon = btn?.querySelector(".bi");
    if (btn) btn.classList.remove("pause");
    if (btnIcon) btnIcon.classList.add("bi-play-fill");
    if (btnIcon) btnIcon.classList.remove("bi-pause-fill");
  });

  // توقف ویدیو
  podcastVideo.pause();
  podcastVideo.currentTime = 0;
  if (currentVideoControls) {
    currentVideoControls.playBtn.classList.remove("pause");
    currentVideoControls.playBtnIcon.classList.add("bi-play-fill");
    currentVideoControls.playBtnIcon.classList.remove("bi-pause-fill");
    currentVideoControls.seekBar.value = 0;
    currentVideoControls.seekBar.style.background = `linear-gradient(to right, var(--primary) 0%, var(--primary) 0%, #ddd 0%, #ddd 100%)`;
  }
  if (type === "audio") {
    const imgSrc = currentSlide.getAttribute("data-img") || "";
    podcastImage.src = imgSrc;
    podcastImage.style.display = "block";
    podcastVideo.style.display = "none";
    podcastVideo.src = "";

    const audioElem = currentSlide.querySelector("audio");
    if (audioElem) audioElem.style.display = "block";
  } else if (type === "video") {
    const videoSrc = currentSlide.getAttribute("data-video") || "";
    const coverSrc = currentSlide.getAttribute("data-cover") || "";
    podcastVideo.poster = coverSrc;
    podcastVideo.src = videoSrc;
    podcastVideo.style.display = "block";
    podcastImage.style.display = "none";

    const audioElem = currentSlide.querySelector("audio");
    if (audioElem) audioElem.style.display = "none";
    podcastVideo.load();
    podcastVideo.pause();

    setupVideoControls(currentSlide);
  }

  updateActiveControl(index);
}

// گوش دادن به رویداد اسکرول
sliderContainer.addEventListener("scroll", updateOnScroll);

// کنترل‌های پخش صوت
const audioPlayers = document.querySelectorAll(
  ".slide-o[data-type='audio'] .custom-player-o",
);

audioPlayers.forEach((player) => {
  const audio = player.closest(".slide-o").querySelector("audio");
  const playBtn = player.querySelector(".play-btn-o");
  const playBtnIcon = playBtn?.querySelector(".bi");
  const seekBar = player.querySelector(".seek-bar-o");
  const timeDisplay = player.querySelector(".time-o");
  const volume = player.querySelector(".volume-o");

  audio.volume = volume.value;

  const format = (s) => {
    const m = Math.floor(s / 60);
    const sec = String(Math.floor(s % 60)).padStart(2, "0");
    return `${m}:${sec}`;
  };

  volume.addEventListener("input", () => {
    audio.volume = volume.value;

    const min = volume.min;
    const max = volume.max;

    // محاسبه درصد مقدار فعلی
    const percentage = ((volume.value - min) * 100) / (max - min);

    volume.style.background = `linear-gradient(to right, var(--primary) 0%, var(--primary) ${percentage}%, #ddd ${percentage}%, #ddd 100%)`;
  });

  audio.addEventListener("loadedmetadata", () => {
    if (!isNaN(audio.duration)) {
      seekBar.max = audio.duration;
      seekBar.value = 0;
      timeDisplay.textContent = `${format(audio.duration)} / 0:00`;
    }
  });

  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      document.querySelectorAll("audio").forEach((otherAudio) => {
        if (otherAudio !== audio) {
          otherAudio.pause();
          otherAudio.currentTime = 0;
          const otherBtn = otherAudio
            .closest(".slide-o")
            ?.querySelector(".play-btn-o");
          if (otherBtn) otherBtn.classList.remove("pause");
        }
      });

      podcastVideo.pause();
      podcastVideo.currentTime = 0;
      if (currentVideoControls)
        currentVideoControls.playBtn.classList.remove("pause");

      audio
        .play()
        .then(() => {
          playBtn.classList.add("pause");
          playBtnIcon.classList.remove("bi-play-fill");
          playBtnIcon.classList.add("bi-pause-fill");
        })
        .catch((e) => console.error("خطا در پخش صدا:", e));
    } else {
      audio.pause();
      playBtn.classList.remove("pause");
      playBtnIcon.classList.remove("bi-pause-fill");
      playBtnIcon.classList.add("bi-play-fill");
    }
  });

  audio.addEventListener("timeupdate", () => {
    if (!isNaN(audio.duration)) {
      seekBar.max = audio.duration;
      seekBar.value = audio.currentTime;
      timeDisplay.textContent = `${format(audio.duration)} / ${format(audio.currentTime)}`;

      const min = seekBar.min;
      const max = seekBar.max;

      // محاسبه درصد مقدار فعلی
      const percentage = ((seekBar.value - min) * 100) / (max - min);

      seekBar.style.background = `linear-gradient(to right, var(--primary) 0%, var(--primary) ${percentage}%, #ddd ${percentage}%, #ddd 100%)`;
    }
  });

  seekBar.addEventListener("input", () => {
    audio.currentTime = seekBar.value;
  });

  audio.addEventListener("ended", () => {
    playBtn.classList.remove("pause");
    playBtnIcon.classList.remove("bi-pause-fill");
    playBtnIcon.classList.add("bi-play-fill");
    audio.currentTime = 0;
    seekBar.value = 0;
    timeDisplay.textContent = `${format(audio.duration)} / 0:00`;
  });
});

// تنظیم اولیه
window.addEventListener("load", () => {
  sliderContainer.scrollTop = 0;
  setTimeout(() => {
    updateOnScroll();
  }, 100);
});
