const quotes = {
  nl: [
    "Blijf leren. Blijf groeien. Blijf doorgaan.",
    "Je toekomst begint met wat je vandaag doet, niet morgen.",
    "Kennis is geen doel op zich, maar een sleutel tot een betere toekomst.",
    "Falen is slechts een kans om opnieuw te beginnen, maar dan slimmer.",
    "Wat je vandaag leert, kan morgen een verschil maken.",
    "De enige manier om te slagen is door nooit op te geven.",
    "Onderwijs is het krachtigste wapen dat je kunt gebruiken om de wereld te veranderen.",
    "Begin met geloven dat je het kunt, en de rest volgt vanzelf.",
    "Studeren opent deuren die je nooit voor mogelijk had gehouden.",
    "Succes is het resultaat van kleine inspanningen, elke dag opnieuw."
  ],
  en: [
    "Keep learning. Keep growing. Keep going.",
    "Your future starts with what you do today, not tomorrow.",
    "Knowledge isn't the goal, it's the key to a better future.",
    "Failure is just a chance to start over, but smarter.",
    "What you learn today can make a difference tomorrow.",
    "The only way to succeed is to never give up.",
    "Education is the most powerful weapon you can use to change the world.",
    "Start by believing you can, and the rest will follow.",
    "Studying opens doors you never thought possible.",
    "Success is the result of small efforts, repeated every day."
  ]
};

// Maakt de functie toegankelijk voor andere bestanden
function showRandomQuote(language = 'nl') {
  const quoteElement = document.getElementById("quote");
  if (!quoteElement) return;

  const randomQuote = quotes[language][Math.floor(Math.random() * quotes[language].length)];
  quoteElement.textContent = randomQuote;
}

// Beschikbaar maken in global scope zodat language.js het kan gebruiken
window.showRandomQuote = showRandomQuote;