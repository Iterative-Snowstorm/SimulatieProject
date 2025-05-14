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
            login_title: "Inloggen bij StudentBuddy",
                login_email: "Email",
                login_pass: "Wachtwoord",
                login_or: "OF",
                login_btn: "Inloggen",
                login_guest_btn: "Doorgaan als gast",
                login_guest_small: "In gastmodus kun je StudentBuddy gebruiken, maar je voortgang wordt niet opgeslagen.",
            form_desc: "Neem contact met ons op",
                form_title: "Formulier vragen / suggesties",
                form_detail: "Vul het onderstaande formulier voor vragen of suggesties.",
                form_name: "Je naam: *",
                form_fullname: "Geef je naam en voornaam op",
                form_label_email: "E-mailadres UCLL: *",
                form_email: "Geef je e-mailadres op",
                form_choose_option: "Kies een optie: *",
                    form_choose_option_01: "Vraag",
                    form_choose_option_02: "Suggestie",
                form_option: "Jouw vraag / suggestie: *",
                form_questions: "Geef je vraag of suggestie op",
                form_submit: "Indienen"


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
            login_title: "Login to StudentBuddy",
                login_email: "Email",
                login_pass: "Password",
                login_or: "OR",
                login_btn: "Sign In",
                login_guest_btn: "Continue as guest",
                login_guest_small: "In guest mode, you can use StudentBuddy, but your progress will not be saved.",
            form_desc: "Contact us",
                form_title: "Form questions / suggestions",
                form_detail: "Please fill out the form below for questions or suggestions.",
                form_name: "Your name: *",
                form_fullname: "Please provide your surname and first name",
                form_label_email: "Email address UCLL: *",
                form_email: "Please provide your email address",
                form_choose_option: "Choose an option: *",
                    form_choose_option_01: "Question",
                    form_choose_option_02: "Suggestion",
                form_option: "Your question/suggestion: *",
                form_questions: "Please enter your question or suggestion",
                form_submit: "Submit"

        }
    };

     flags.forEach(flag => {
        flag.addEventListener('click', function() {
            const language = flag.classList.contains('nl-flag') ? 'nl' : 'en';
            flags.forEach(f => f.classList.remove('active'));
            flag.classList.add('active');
            console.log('Language changed to:', language === 'nl' ? 'Dutch' : 'English');

            // Update Static Text
            document.querySelectorAll('[data-key]').forEach(element => {
                const key = element.getAttribute('data-key');
                element.textContent = translations[language][key];
            });

            // Update the quote with the correct language
            if (typeof showRandomQuote === "function") {
                showRandomQuote(language);
            }
        });
    });

    // When loading page
    // show default quote in EN
    if (typeof showRandomQuote === "function") {
        showRandomQuote('nl');
    }
    
});

