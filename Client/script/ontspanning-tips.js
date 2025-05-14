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

let sec = 600; // 10 minuten in seconden
let timer = null;
let isPaused = false;

function updateDisplay() {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    document.getElementById('timer').innerHTML = 
        `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}


function updateDisplay() {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    document.getElementById('timer').innerHTML = 
        `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function timerVoorWandeling() {
    if (timer !== null || sec <= 0) return;

    timer = setInterval(() => {
        if (!isPaused) {
            sec--;

            if (sec < 0) {
                clearInterval(timer);
                timer = null;
                document.getElementById('timer').innerHTML = "Tijd om terug te keren!";
                return;
            }

            updateDisplay();
        }
    }, 1000);
}

function pauseTimer() {
    isPaused = !isPaused;
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    sec = 600;
    isPaused = false;
    updateDisplay();
}

document.addEventListener("DOMContentLoaded", () => {
    const ademhaling = document.querySelector(".ademhaling");
    if (ademhaling) {
      ademhaling.addEventListener("click", startAdemhalingsoefening);
    }

    const startBtn = document.getElementById("startTimerBtn");
    const pauseBtn = document.getElementById("pauseTimerBtn");
    const resetBtn = document.getElementById("resetTimerBtn");

    if (startBtn) startBtn.addEventListener("click", timerVoorWandeling);
    if (pauseBtn) pauseBtn.addEventListener("click", pauseTimer);
    if (resetBtn) resetBtn.addEventListener("click", resetTimer);
  });

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
