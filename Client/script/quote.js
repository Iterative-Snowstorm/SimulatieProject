const quotes = [
    "Blijf leren. Blijf groeien. Blijf doorgaan.",
    "Je toekomst begint met wat je vandaag doet, niet morgen.",
    "Kennis is geen doel op zich, maar een sleutel tot een betere toekomst.",
    "Falen is slechts een kans om opnieuw te beginnen, maar dan slimmer.",
    "Wat je vandaag leert, kan morgen een verschil maken.",
    "De enige manier om te slagen is door nooit op te geven.",
    "Onderwijs is het krachtigste wapen dat je kunt gebruiken om de wereld te veranderen.",
    "Begin met geloven dat je het kunt, en de rest volgt vanzelf.",
    "Studeren opent deuren die je nooit voor mogelijk had gehouden.",
    "Succes is het resultaat van kleine inspanningen, elke dag opnieuw.",
  ];
  
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  document.getElementById("quote").textContent = randomQuote;