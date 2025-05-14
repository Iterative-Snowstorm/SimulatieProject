// ================= STUDY TIPS WITH ACHIEVEMENTS =================
const currentUser = localStorage.getItem("currentUser") || "guest";
// Track which study tips were viewed
let achievements = JSON.parse(
  localStorage.getItem(`user_${currentUser}_achievements`)
) || {
  pomodorosCompleted: 0,
  todosCompleted: 0,
  relaxationsViewed: 0,
  studyTipsViewed: [],
  badges: [],
};

function saveAchievements() {
  localStorage.setItem(
    `user_${currentUser}_achievements`,
    JSON.stringify(achievements)
  );
}

function checkStudyTipAchievements() {
  const unique = [...new Set(achievements.studyTipsViewed)];
  if (unique.length >= 5 && !achievements.badges.includes("studytips5")) {
    achievements.badges.push("studytips5");
    alert("🎉 Achievement unlocked: Read 5 study tips!");
    saveAchievements();
  }
}

// Handle post-it open/close logic and track views
function handlePostitClick(postit) {
  const lastOpenedPostit = document.querySelector(".postit.open");
  const overlay =
    document.querySelector(".overlay") || document.createElement("div");

  if (!overlay.classList.contains("overlay")) {
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);
  }

  if (lastOpenedPostit && lastOpenedPostit !== postit) {
    lastOpenedPostit.classList.remove("open");
    overlay.style.display = "none";
  }

  postit.classList.toggle("open");
  overlay.style.display = postit.classList.contains("open") ? "block" : "none";

  overlay.addEventListener("click", () => {
    postit.classList.remove("open");
    overlay.style.display = "none";
  });

  // Track opened tips by ID (use innerText snippet as identifier)
  const id = postit.innerText.slice(0, 30);
  achievements.studyTipsViewed.push(id);
  checkStudyTipAchievements();
  saveAchievements();
  renderBadges();
}

// Assign click handlers to all post-its
document.querySelectorAll(".postit").forEach((postit) => {
  postit.addEventListener("click", () => handlePostitClick(postit));
});

// Render achievement badges if section exists
function renderBadges() {
  const badgeContainer = document.getElementById("achievement-badges");
  if (!badgeContainer) return;

  badgeContainer.innerHTML = achievements.badges
    .map((badge) => `<div class="badge">🏆 ${badge}</div>`)
    .join("");
}

// Render immediately if page is ready
document.addEventListener("DOMContentLoaded", renderBadges);
