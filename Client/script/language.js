// Change Language functionality
document.addEventListener('DOMContentLoaded', function() {
    const flags = document.querySelectorAll('.flag');
    const translations = {
        nl: {
            nav_home: "home",
            nav_login: "Inloggen",
            nav_studytips: "Studie Tips",
            nav_relaxationtips: "Ontspanning Tips",
            nav_studytools: "Studie Tools",
            nav_contact: "Contact",
            hero_welcome: "Welkom!",
            hero_intro: "Bekijk onze website voor meer studie tips!",
            section_studytips_title: "Studie Tips",
                section_studytips_pg: "Wil je slimmer studeren en betere resultaten behalen? Ontdek handige tips voor planning, concentratie en examenvoorbereiding. Leer efficiënter samenvatten, blijf gemotiveerd en haal het beste uit je studie. Met de juiste aanpak maak je studeren makkelijker én leuker!", 
                section_studytips_btn: "BEKIJK STUDIE TIPS",
            section_relaxation_title: "Ontspanning Tips",
                section_relaxation_pg: "Studeren is belangrijk, maar ontspanning ook! Neem op tijd pauzes, beweeg voldoende en zorg voor een goede balans tussen inspanning en ontspanning. Ontdek tips om stress te verminderen en je energie op peil te houden, zodat je fris en gefocust blijft.",
                section_relaxation_btn: "Bekijk Ontspanning Tips",
            footer_title_lg: "Heb je nood aan studiebegeleiding?",
            footer_title_sm: "Wij staan voor je klaar!",
            footer_bottom: "© 2025 - Hogeschool UCLL",


        },
        en: {
            nav_home: "home",
            nav_login: "Login",
            nav_studytips: "Study Tips",
            nav_relaxationtips: "Relaxation Tips",
            nav_studytools: "Study Tools",
            nav_contact: "Contact Us",
            hero_welcome: "Welcome!",
            hero_intro: "Check out our website for more study tips!",
            section_studytips_title: "Study Tips",
                section_studytips_pg: "Want to study smarter and get better results? Discover useful tips for planning, concentration and exam preparation. Learn to summarize more efficiently, stay motivated and get the best out of your studies. With the right approach, you can make studying easier and more fun!",
                section_studytips_btn: "View Study Tips",
            section_relaxation_title: "Relaxation Tips",
                section_relaxation_pg: "Studying is important, but so is relaxation! Take timely breaks, get enough exercise and make sure you have a good balance between exertion and relaxation. Discover tips to reduce stress and keep your energy up, so you stay fresh and focused.",
                section_relaxation_btn: "View Relaxation Tips",
            footer_title_lg: "Are you in need of tutoring?",
            footer_title_sm: "We're here for you!",
            footer_bottom: "© 2025 - University of Applied Sciences UCLL",

        }
    };

     flags.forEach(flag => {
        flag.addEventListener('click', function() {
            const language = flag.classList.contains('nl-flag') ? 'nl' : 'en';
            flags.forEach(f => f.classList.remove('active'));
            flag.classList.add('active');
            console.log('Language changed to:', language === 'nl' ? 'Dutch' : 'English');

            // 🔁 Update statische teksten
            document.querySelectorAll('[data-key]').forEach(element => {
                const key = element.getAttribute('data-key');
                element.textContent = translations[language][key];
            });

            // 🧠 Update de quote met de juiste taal
            if (typeof showRandomQuote === "function") {
                showRandomQuote(language);
            }
        });
    });

    // Bij pagina laden → standaardquote tonen in NL
    if (typeof showRandomQuote === "function") {
        showRandomQuote('nl');
    }
    
});

