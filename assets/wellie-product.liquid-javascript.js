document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('[data-product-section]');
  if (!section) return;

  const gallery = section.querySelector('[data-wellie-gallery]');
  const mediaItems = [...section.querySelectorAll('[data-wellie-media]')];
  const thumbnails = [...section.querySelectorAll('[data-wellie-thumbnail]')];
  const price = section.querySelector('[data-product-price]');
  const comparePrice = section.querySelector('[data-product-compare-price]');

  const setActiveMedia = (mediaId) => {
    const index = mediaItems.findIndex((media) => media.dataset.wellieMedia === String(mediaId));
    if (index < 0) return;

    for (const [itemIndex, media] of mediaItems.entries()) {
      const isActive = itemIndex === index;
      media.classList.toggle('is-active', isActive);
      media.classList.toggle('hidden', !isActive);
    }
    for (const thumbnail of thumbnails) {
      const isActive = thumbnail.dataset.wellieThumbnail === String(mediaId);
      thumbnail.classList.toggle('is-active', isActive);
      thumbnail.classList.toggle('opacity-100', isActive);
      thumbnail.classList.toggle('opacity-60', !isActive);
      thumbnail.setAttribute('aria-pressed', String(isActive));
    }
  };

  const moveGallery = (direction) => {
    const activeIndex = mediaItems.findIndex((media) => media.classList.contains('is-active'));
    const nextIndex = (activeIndex + direction + mediaItems.length) % mediaItems.length;
    setActiveMedia(mediaItems[nextIndex]?.dataset.wellieMedia);
  };

  for (const thumbnail of thumbnails) {
    thumbnail.addEventListener('click', () => setActiveMedia(thumbnail.dataset.wellieThumbnail));
  }
  gallery?.querySelector('[data-wellie-gallery-previous]')?.addEventListener('click', () => moveGallery(-1));
  gallery?.querySelector('[data-wellie-gallery-next]')?.addEventListener('click', () => moveGallery(1));

  for (const offer of section.querySelectorAll('[data-copy-code]')) {
    offer.addEventListener('click', async () => {
      const code = offer.dataset.copyCode;
      if (!code || !navigator.clipboard) return;
      await navigator.clipboard.writeText(code);
      offer.dataset.copied = 'true';
      window.setTimeout(() => delete offer.dataset.copied, 1600);
    });
  }

  if (typeof subscribe === 'undefined' || typeof PUB_SUB_EVENTS === 'undefined') return;
  subscribe(PUB_SUB_EVENTS.variantChange, (data) => {
    if (data.productId !== section.dataset.productId || !data.variant) return;
    price.textContent = data.variant.price_formatted;
    if (data.variant.compare_at_price > data.variant.price) {
      comparePrice.textContent = data.variant.compare_at_price_formatted;
      comparePrice.classList.remove('is-hidden');
      comparePrice.classList.remove('hidden');
    } else {
      comparePrice.textContent = '';
      comparePrice.classList.add('is-hidden');
      comparePrice.classList.add('hidden');
    }
    if (data.variant.featured_media_id) setActiveMedia(data.variant.featured_media_id);
  });
});
