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

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".ademhaling").addEventListener("click", startAdemhalingsoefening);
});
