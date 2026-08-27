document.addEventListener('DOMContentLoaded', () => {
  const wellieForms = document.querySelectorAll(
    '[data-wellie-add-to-cart-form]'
  );

  wellieForms.forEach((form) => {
    const addToCartButton = form.querySelector(
      '[data-wellie-add-to-cart]'
    );

    if (!addToCartButton) {
      return;
    }

    addToCartButton.addEventListener('click', async () => {
      const variantId = addToCartButton.dataset.variantId;

      if (!variantId) {
        return;
      }

      if (
        typeof CartAPI === 'undefined' ||
        typeof CartStore === 'undefined'
      ) {
        console.error(
          'CartAPI or CartStore is not available.'
        );
        return;
      }

      try {
        addToCartButton.disabled = true;

        await CartStore.init();
        CartStore.addPending();

        const cartDrawer = document.querySelector('cart-drawer');
        const sectionId = cartDrawer?.dataset?.sectionId;
        const sections = sectionId ? [sectionId] : [];

        // Open the cart drawer immediately
        cartDrawer?.open();

        const formData = new FormData();
        formData.append('id', variantId);
        formData.append('quantity', '1');

        const data = await CartAPI.add(
          formData,
          sections
        );

        // Update cart drawer contents
        if (
          sectionId &&
          data.sections?.[sectionId] &&
          cartDrawer &&
          typeof Idiomorph !== 'undefined'
        ) {
          const doc = new DOMParser().parseFromString(
            data.sections[sectionId],
            'text/html'
          );

          const newItemsEl = doc.querySelector(
            '[data-cart-items]'
          );

          const existingItemsEl = cartDrawer.querySelector(
            '[data-cart-items]'
          );

          if (newItemsEl && existingItemsEl) {
            Idiomorph.morph(
              existingItemsEl,
              newItemsEl,
              {
                morphStyle: 'outerHTML'
              }
            );
          }

          const newFooterEl = doc.querySelector(
            '[data-cart-footer]'
          );

          const existingFooterEl = cartDrawer.querySelector(
            '[data-cart-footer]'
          );

          if (newFooterEl && existingFooterEl) {
            Idiomorph.morph(
              existingFooterEl,
              newFooterEl,
              {
                morphStyle: 'outerHTML'
              }
            );
          }
        }

        const cartData = await CartAPI.get();

        CartStore.addConfirm(cartData);

      } catch (error) {
        CartStore.addRollback();

        console.error(
          'Wellie Suggestions add to cart failed:',
          error
        );

      } finally {
        addToCartButton.disabled = false;
      }
    });
  });
});