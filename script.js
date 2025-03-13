const img = document.querySelector("img");
const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const start_time = document.querySelector("#start");
const end_time = document.querySelector("#end");
const line = document.querySelector(".line");
const pline = document.querySelector(".pline");
const forw = document.querySelector(".fa-forward");
const back = document.querySelector(".fa-backward");
const play = document.querySelector(".fa-play");
const aud = document.querySelector(".audio");
const main = document.querySelector(".main");

let i = 0;

const img_url_list = [
  "https://img.youtube.com/vi/CgLF_IRKFGM/maxresdefault.jpg",
  "https://img.youtube.com/vi/lNOtv1mXbQ8/maxresdefault.jpg",
  "https://img.youtube.com/vi/SeS00eJnguo/maxresdefault.jpg",
];

const music_tile_list = ["True-Love", "Regrets", "My-Prime"];
const desc_list = ["Music #1", "Music #2", "Music #3"];

const music_list = ["Mus1", "Mus2", "Mus3"];

function playy() {
  aud.play();
  play.classList.replace("fa-play", "fa-pause");
  main.style.boxShadow = "0 0 20px rgba(0, 255, 255, 0.8)";

  let duration = 0;
  // duration setting
  aud.addEventListener("loadedmetadata", () => {
    duration = aud.duration;

    if (!isNaN(duration)) {
      let min = Math.floor(duration / 60);
      let sec = Math.floor(duration % 60);
      end_time.innerHTML = `${min}:${sec < 10 ? "0" + sec : sec}`;
    } else {
      end_time.innerHTML = "0:00"; // Default in case of failure
    }
  });
}

play.addEventListener("click", () => {
  if (aud.paused) {
    playy();
  } else {
    aud.pause();
    main.style.boxShadow = "0 0 20px rgba(255, 255, 255, 0.8)";
    play.classList.replace("fa-pause", "fa-play");
  }
});

forw.addEventListener("click", () => {
  //   progress bar
  pline.style.width = "0px";

  i = (i + 1) % 3;

  img.src = img_url_list[i];
  h1.innerHTML = music_tile_list[i];
  h2.innerHTML = desc_list[i];
  aud.src = `assets/music/${music_list[i]}.mp3`;

  playy();
});

back.addEventListener("click", () => {
  //   progress bar
  pline.style.width = "0px";
  i = (i - 1 + 3) % 3;

  img.src = img_url_list[i];
  h1.innerHTML = music_tile_list[i];
  h2.innerHTML = desc_list[i];
  aud.src = `assets/music/${music_list[i]}.mp3`;
  playy();
});

aud.addEventListener("timeupdate", () => {
  let progress = (aud.currentTime / aud.duration) * 100;
  pline.style.width = `${progress}%`;

  let min = Math.round(aud.currentTime / 60);
  let sec = Math.round(aud.currentTime % 60);
  if (sec < 10) {
    start_time.innerHTML = `${min}:0${sec}`;
  } else start_time.innerHTML = `${min}:${sec}`;
});

line.addEventListener("click", (e) => {
  let rect = line.getBoundingClientRect(); // Get bar position
  let clickX = e.clientX - rect.left; // Click position relative to bar
  let width = rect.width; // Total width of bar
  let newTime = (clickX / width) * aud.duration; // Calculate new time

  aud.currentTime = newTime; // Set new audio time
});

aud.addEventListener("ended", () => {
  pline.style.width = "0px";

  i = (i + 1) % 3;

  img.src = img_url_list[i];
  h1.innerHTML = music_tile_list[i];
  h2.innerHTML = desc_list[i];
  aud.src = `assets/music/${music_list[i]}.mp3`;

  playy();
});
