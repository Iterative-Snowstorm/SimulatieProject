// Willekeurige moppen generator
const moppen = [
    "Waarom kon de computer geen kaartspel spelen? Hij was gecrasht!",
    "Waarom nam de wiskundeleraar een ladder mee naar school? Omdat hij naar een hoger niveau wilde!",
    "Wat zegt een muur tegen een andere muur? We treffen elkaar op de hoek!"
];

function genereerMop() {
    const randomIndex = Math.floor(Math.random() * moppen.length);
    document.getElementById("mop").innerText = moppen[randomIndex];
}

// Ademhalingsoefening animatie
function startAdemhalingsoefening() {
    const ademhaling = document.querySelector(".ademhaling");
    ademhaling.classList.add("adem-animatie");
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



document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".ademhaling").addEventListener("click", startAdemhalingsoefening);
});
