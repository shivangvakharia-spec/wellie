document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('[data-wellie-gallery]');

  if (!gallery) return;

  const mediaItems = [...gallery.querySelectorAll('[data-wellie-media]')];
  const thumbnails = [...document.querySelectorAll('[data-wellie-thumbnail]')];

  if (mediaItems.length === 0 || thumbnails.length === 0) return;

  const setActiveMedia = (mediaId) => {
    mediaItems.forEach((media) => {
      const isActive = media.dataset.wellieMedia === mediaId;

      media.classList.toggle('hidden', !isActive);
    });

    thumbnails.forEach((thumbnail) => {
      const isActive = thumbnail.dataset.wellieThumbnail === mediaId;

      thumbnail.classList.toggle('opacity-100', isActive);
      thumbnail.classList.toggle('opacity-60', !isActive);
      thumbnail.setAttribute('aria-pressed', String(isActive));
    });
  };

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
      const mediaId = thumbnail.dataset.wellieThumbnail;

      if (!mediaId) return;

      setActiveMedia(mediaId);
    });
  });

  if (typeof subscribe !== 'undefined' && typeof PUB_SUB_EVENTS !== 'undefined') {
    subscribe(PUB_SUB_EVENTS.variantChange, (data) => {
      const variant = data.variant;

      if (!variant?.featured_media_id) return;

      setActiveMedia(String(variant.featured_media_id));
    });
  }
});