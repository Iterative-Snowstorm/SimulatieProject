document.querySelectorAll('.postit').forEach(postit => {
    postit.addEventListener('click', () => {
        const lastOpenedPostit = document.querySelector('.postit.open');
        const overlay = document.querySelector('.overlay') || document.createElement('div');

        if (!overlay.classList.contains('overlay')) {
            overlay.classList.add('overlay');
            document.body.appendChild(overlay);
        }

        if (lastOpenedPostit && lastOpenedPostit !== postit) {
            lastOpenedPostit.classList.remove('open');
            overlay.style.display = 'none';
        }

        postit.classList.toggle('open');
        overlay.style.display = postit.classList.contains('open') ? 'block' : 'none';

        overlay.addEventListener('click', () => {
            postit.classList.remove('open');
            overlay.style.display = 'none';
        });
    });
});