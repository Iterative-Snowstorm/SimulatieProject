// Change Language functionality
document.addEventListener('DOMContentLoaded', function() {
    const flags = document.querySelectorAll('.flag');

    flags.forEach(flag => {
        flag.addEventListener('click', function() {
            flags.forEach(f => f.classList.remove('active'));
            flag.classList.add('active');
            console.log('Language changed to:', flag.classList.contains('nl-flag') ? 'Dutch' : 'English');
        });
    });
});
