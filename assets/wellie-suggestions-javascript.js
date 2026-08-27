document.addEventListener('DOMContentLoaded', () => {

  const sections = document.querySelectorAll(
    '.wellie-you-might-also-like'
  );


  sections.forEach((section) => {

    /* =====================================================
       Add To Cart
       ===================================================== */

    const forms = section.querySelectorAll(
      '.wellie-you-might-also-like__form'
    );


    forms.forEach((form) => {

      form.addEventListener('submit', async (event) => {

        event.preventDefault();

        const addToCartButton = form.querySelector(
          '.wellie-you-might-also-like__add-button'
        );

        if (addToCartButton?.disabled) {
          return;
        }


        /* ---------------------------------------------------
           Add To Cart
           --------------------------------------------------- */

        if (
          typeof CartAPI === 'undefined' ||
          typeof CartStore === 'undefined'
        ) {
          form.submit();
          return;
        }

        const originalButtonText = addToCartButton?.textContent;

        try {

          if (addToCartButton) {
            addToCartButton.disabled = true;
          }

          await CartStore.init();
          CartStore.addPending();

          const cartDrawer = document.querySelector('cart-drawer');
          const sectionId = cartDrawer?.dataset?.sectionId;
          const sectionIds = sectionId ? [sectionId] : [];

          cartDrawer?.open();

          const formData = new FormData(form);

          const data = await CartAPI.add(formData, sectionIds);

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

            const newItemsEl = doc.querySelector('[data-cart-items]');
            const existingItemsEl = cartDrawer.querySelector('[data-cart-items]');
            if (newItemsEl && existingItemsEl) {
              Idiomorph.morph(existingItemsEl, newItemsEl, { morphStyle: 'outerHTML' });
            }

            const newFooterEl = doc.querySelector('[data-cart-footer]');
            const existingFooterEl = cartDrawer.querySelector('[data-cart-footer]');
            if (newFooterEl && existingFooterEl) {
              Idiomorph.morph(existingFooterEl, newFooterEl, { morphStyle: 'outerHTML' });
            }
          }

          const cartData = await CartAPI.get();
          CartStore.addConfirm(cartData);

        } catch (error) {

          CartStore.addRollback();

          console.error(
            'Add to cart failed:',
            error
          );

        } finally {

          if (addToCartButton) {
            addToCartButton.disabled = false;

            if (originalButtonText !== undefined) {
              addToCartButton.textContent = originalButtonText;
            }
          }

        }

      });

    });

  });

});
