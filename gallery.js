/* An accessible viewer for the original family photographs. No external services. */
(() => {
  'use strict';
  const photos = Array.from(document.querySelectorAll('[data-gallery-photo]'));
  const dialog = document.querySelector('#lola-gallery-dialog');
  if (!photos.length || !dialog || typeof dialog.showModal !== 'function') return;

  const image = dialog.querySelector('#gallery-image');
  const caption = dialog.querySelector('#gallery-caption');
  const counter = dialog.querySelector('#gallery-count');
  const status = dialog.querySelector('#gallery-status');
  const closeButton = dialog.querySelector('#gallery-close');
  let current = 0;
  let returnFocus = null;

  function showPhoto(index) {
    current = (index + photos.length) % photos.length;
    const link = photos[current];
    const thumbnail = link.querySelector('img');
    image.src = link.href;
    image.alt = thumbnail.alt;
    caption.textContent = link.dataset.caption || thumbnail.alt;
    counter.textContent = `${current + 1} of ${photos.length}`;
    status.textContent = `Photo ${current + 1} of ${photos.length}. ${caption.textContent}`;
  }

  photos.forEach((link, index) => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      returnFocus = link;
      showPhoto(index);
      dialog.showModal();
      document.documentElement.classList.add('gallery-is-open');
      closeButton.focus({ preventScroll: true });
    });
  });

  dialog.querySelector('#gallery-previous').addEventListener('click', () => showPhoto(current - 1));
  dialog.querySelector('#gallery-next').addEventListener('click', () => showPhoto(current + 1));
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(current - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(current + 1); }
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('gallery-is-open');
    status.textContent = '';
    if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
  });
})();
