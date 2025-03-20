document.querySelectorAll('.postit').forEach(postit => {
  postit.addEventListener('click', () => {
      // Collapse any previously opened post-it
      const lastOpenedPostit = document.querySelector('.postit.open');
      if (lastOpenedPostit && lastOpenedPostit !== postit) {
          lastOpenedPostit.classList.remove('open');
      }

      // Toggle the 'open' class on the clicked post-it
      postit.classList.toggle('open');
      
      // Create and append content if not already present
      if (!postit.querySelector('.content')) {
          const content = document.createElement('div');
          content.classList.add('content');
          content.innerHTML = `<p>This is the content for ${postit.dataset.category}</p>`;
          postit.appendChild(content);
      }
  });
});