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

function timerVoorWandeling() {
    var sec = 600; // 10 minuten = 600 seconden
    var timer = setInterval(function () {
        var minutes = Math.floor(sec / 60); // Minuten berekenen
        var seconds = sec % 60; // Overgebleven seconden berekenen
        
        // Correcte weergave met voorloopnul indien seconden < 10
        document.getElementById('timer').innerHTML = 
            `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        sec--;
        
        if (sec < 0) {
            clearInterval(timer);
            document.getElementById('timer').innerHTML = "Tijd om terug te keren!"; // Eindmelding
        }
    }, 1000);
}



document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".ademhaling").addEventListener("click", startAdemhalingsoefening);
});
