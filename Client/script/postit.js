document.querySelectorAll('.postit').forEach(postit => {
  postit.addEventListener('click', () => {
      const lastOpenedPostit = document.querySelector('.postit.open');
      if (lastOpenedPostit && lastOpenedPostit !== postit) {
          lastOpenedPostit.classList.remove('open');
      }

      postit.classList.toggle('open');
      
      if (!postit.querySelector('.content')) {
          const content = document.createElement('div');
          content.classList.add('content');
          postit.appendChild(content);
      }
  });
});