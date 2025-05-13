// ================= RELAXATION TIPS WITH ACHIEVEMENTS =================

// Store and track achievement progress
let achievements = JSON.parse(localStorage.getItem("achievements")) || {
  pomodorosCompleted: 0,
  todosCompleted: 0,
  relaxationsViewed: 0,
  studyTipsViewed: [],
  badges: [],
};

function saveAchievements() {
  localStorage.setItem("achievements", JSON.stringify(achievements));
}

function checkRelaxationAchievements() {
  if (
    achievements.relaxationsViewed >= 3 &&
    !achievements.badges.includes("relax3")
  ) {
    achievements.badges.push("relax3");
    alert("🎉 Achievement unlocked: Viewed 3 relaxation activities!");
  }
  saveAchievements();
  renderBadges();
}

function incrementRelaxation() {
  achievements.relaxationsViewed++;
  checkRelaxationAchievements();
}

// Random joke generator
const moppen = [
  "Waarom kon de computer geen kaartspel spelen? Hij was gecrasht!",
  "Waarom nam de wiskundeleraar een ladder mee naar school? Omdat hij naar een hoger niveau wilde!",
  "Wat zegt een muur tegen een andere muur? We treffen elkaar op de hoek!",
];

function genereerMop() {
  const randomIndex = Math.floor(Math.random() * moppen.length);
  document.getElementById("mop").innerText = moppen[randomIndex];
  incrementRelaxation(); // count as activity
}

// Breathing animation
function startAdemhalingsoefening() {
  const ademhaling = document.querySelector(".ademhaling");
  ademhaling.classList.add("adem-animatie");
  incrementRelaxation();
  setTimeout(() => {
    ademhaling.classList.remove("adem-animatie");
  }, 4000);
}

// Walking timer
function timerVoorWandeling() {
  var sec = 600; // 10 minutes
  var timer = setInterval(function () {
    var minutes = Math.floor(sec / 60);
    var seconds = sec % 60;

    document.getElementById("timer").innerHTML = `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;

    sec--;

    if (sec < 0) {
      clearInterval(timer);
      document.getElementById("timer").innerHTML = "Tijd om terug te keren!";
      incrementRelaxation();
    }
  }, 1000);
}

// Setup event listeners once the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".ademhaling")
    .addEventListener("click", startAdemhalingsoefening);

  // Render badges if element is present
  renderBadges();
});

// Render any unlocked badges
function renderBadges() {
  const badgeContainer = document.getElementById("achievement-badges");
  if (!badgeContainer) return;

  badgeContainer.innerHTML = achievements.badges
    .map((badge) => `<div class="badge">🏆 ${badge}</div>`)
    .join("");
}
