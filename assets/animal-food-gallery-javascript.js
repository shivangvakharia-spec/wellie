document.addEventListener('DOMContentLoaded', () => {

  const galleries = document.querySelectorAll(
    '.animal-food-gallery'
  );


  galleries.forEach((gallery) => {

    /* =====================================================
       Discount Badge Copy
       ===================================================== */

    const discountCopyButtons = gallery.querySelectorAll(
      '[data-discount-code]'
    );


    discountCopyButtons.forEach((button) => {

      button.addEventListener('click', async () => {

        const discountCode = button.dataset.discountCode;

        if (!discountCode) {
          return;
        }


        try {

          await navigator.clipboard.writeText(
            discountCode
          );


          button.classList.add(
            'animal-food-gallery__discount-badge-copy--copied'
          );


          button.setAttribute(
            'aria-label',
            'Discount code copied'
          );


          setTimeout(() => {

            button.classList.remove(
              'animal-food-gallery__discount-badge-copy--copied'
            );

            button.setAttribute(
              'aria-label',
              'Copy discount code'
            );

          }, 1500);


        } catch (error) {

          console.error(
            'Failed to copy discount code:',
            error
          );

        }

      });

    });


    /* =====================================================
       Image Gallery Elements
       ===================================================== */

    const mainImage = gallery.querySelector(
      '.animal-food-gallery__main-image'
    );

    const mobileCarousel = gallery.querySelector(
  '[data-gallery-mobile-carousel]'
);

const mobileTrack = gallery.querySelector(
  '[data-gallery-mobile-track]'
);

const mobileSlides = mobileTrack
  ? Array.from(
      mobileTrack.querySelectorAll(
        '.animal-food-gallery__mobile-slide'
      )
    )
  : [];

    const thumbnails = Array.from(
      gallery.querySelectorAll(
        '.animal-food-gallery__thumbnail'
      )
    );


    const previousButton = gallery.querySelector(
      '[data-gallery-previous]'
    );


    const nextButton = gallery.querySelector(
      '[data-gallery-next]'
    );


    /* =====================================================
       Quantity Selector
       ===================================================== */

    const quantityValue = gallery.querySelector(
      '[data-quantity-value]'
    );


    const decreaseQuantityButton = gallery.querySelector(
      '[data-quantity-decrease]'
    );


    const increaseQuantityButton = gallery.querySelector(
      '[data-quantity-increase]'
    );


    let quantity = 1;


    /* -----------------------------------------------------
       Update Quantity Display
       ----------------------------------------------------- */

    const updateQuantityDisplay = () => {

      if (!quantityValue) {
        return;
      }


      quantityValue.textContent =
        String(quantity).padStart(2, '0');

    };


    /* -----------------------------------------------------
       Decrease Quantity
       ----------------------------------------------------- */

    if (decreaseQuantityButton) {

      decreaseQuantityButton.addEventListener(
        'click',
        () => {

          if (quantity <= 1) {
            return;
          }


          quantity -= 1;

          updateQuantityDisplay();

        }
      );

    }


    /* -----------------------------------------------------
       Increase Quantity
       ----------------------------------------------------- */

    if (increaseQuantityButton) {

      increaseQuantityButton.addEventListener(
        'click',
        () => {

          quantity += 1;

          updateQuantityDisplay();

        }
      );

    }


    /* =====================================================
       Add To Cart
       ===================================================== */

    const addToCartButton = gallery.querySelector(
      '[data-add-to-cart]'
    );


    if (addToCartButton) {

      addToCartButton.addEventListener(
        'click',
        async () => {

          /* ---------------------------------------------------
             Find Selected Variant
             --------------------------------------------------- */

          const selectedVariant = gallery.querySelector(
            '.animal-food-gallery__variant-option--selected'
          );


          if (!selectedVariant) {
            return;
          }


          const variantId =
            selectedVariant.dataset.variantId;


          if (!variantId) {
            return;
          }


          /* ---------------------------------------------------
             Add To Cart
             --------------------------------------------------- */

          if (
            typeof CartAPI === 'undefined' ||
            typeof CartStore === 'undefined'
          ) {
            return;
          }

          try {

            addToCartButton.disabled = true;

            await CartStore.init();
            CartStore.addPending();

            const cartDrawer = document.querySelector('cart-drawer');
            const sectionId = cartDrawer?.dataset?.sectionId;
            const sections = sectionId ? [sectionId] : [];

            cartDrawer?.open();

            const formData = new FormData();
            formData.append('id', variantId);
            formData.append('quantity', quantity);

            const data = await CartAPI.add(formData, sections);

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

            addToCartButton.disabled = false;

          }

        }
      );

    }

    /* =====================================================
   Buy It Now
   ===================================================== */

const buyNowButton = gallery.querySelector(
  '[data-buy-now]'
);


if (buyNowButton) {

  buyNowButton.addEventListener(
    'click',
    () => {

      /* ---------------------------------------------------
         Find Selected Variant
         --------------------------------------------------- */

      const selectedVariant = gallery.querySelector(
        '.animal-food-gallery__variant-option--selected'
      );


      if (!selectedVariant) {
        return;
      }


      /* ---------------------------------------------------
         Get Variant ID
         --------------------------------------------------- */

      const variantId =
        selectedVariant.dataset.variantId;


      if (!variantId) {
        return;
      }


      /* ---------------------------------------------------
         Disable Button
         --------------------------------------------------- */

      buyNowButton.disabled = true;


      /* ---------------------------------------------------
         Create Checkout Form
         --------------------------------------------------- */

      const form = document.createElement('form');

      form.method = 'POST';
      form.action = '/cart/add';


      /* ---------------------------------------------------
         Variant ID
         --------------------------------------------------- */

      const variantInput =
        document.createElement('input');

      variantInput.type = 'hidden';
      variantInput.name = 'id';
      variantInput.value = variantId;


      /* ---------------------------------------------------
         Quantity
         --------------------------------------------------- */

      const quantityInput =
        document.createElement('input');

      quantityInput.type = 'hidden';
      quantityInput.name = 'quantity';
      quantityInput.value = quantity;


      /* ---------------------------------------------------
         Redirect To Checkout
         --------------------------------------------------- */

      const returnInput =
        document.createElement('input');

      returnInput.type = 'hidden';
      returnInput.name = 'return_to';
      returnInput.value = '/checkout';


      /* ---------------------------------------------------
         Submit
         --------------------------------------------------- */

      form.appendChild(variantInput);
      form.appendChild(quantityInput);
      form.appendChild(returnInput);

      document.body.appendChild(form);

      form.submit();

    }
  );

}

    /* =====================================================
       Image Gallery
       ===================================================== */

    if (
      mainImage &&
      thumbnails.length > 0
    ) {

      /* ---------------------------------------------------
         Find Currently Selected Image
         --------------------------------------------------- */

      let currentIndex = thumbnails.findIndex(
        (thumbnail) =>
          thumbnail.getAttribute(
            'aria-current'
          ) === 'true'
      );


      if (currentIndex === -1) {
        currentIndex = 0;
      }


      /* ---------------------------------------------------
         Select Image
         --------------------------------------------------- */

      const selectImage = (index) => {

        if (
          index < 0 ||
          index >= thumbnails.length
        ) {
          return;
        }


        const thumbnail =
          thumbnails[index];


        const imageSrc =
          thumbnail.dataset.imageSrc;


        const imageAlt =
          thumbnail.dataset.imageAlt;


        const imageId =
          thumbnail.dataset.imageId;


        if (!imageSrc) {
          return;
        }


        /* -----------------------------------------------
           Update Main Image
           ----------------------------------------------- */

        mainImage.src = imageSrc;

        mainImage.alt =
          imageAlt || '';

        mainImage.dataset.imageId =
          imageId || '';

        /* -----------------------------------------------
   Update Mobile Carousel
   ----------------------------------------------- */

if (
  mobileCarousel &&
  mobileSlides.length > 0
) {
  const targetSlide = mobileSlides[index];

  if (targetSlide) {
    mobileCarousel.scrollTo({
      left: targetSlide.offsetLeft,
      behavior: 'smooth'
    });
  }
}


        /* -----------------------------------------------
           Remove Selected State
           ----------------------------------------------- */

        thumbnails.forEach((item) => {

          item.classList.remove(
            'animal-food-gallery__thumbnail--selected'
          );


          item.setAttribute(
            'aria-current',
            'false'
          );

        });


        /* -----------------------------------------------
           Add Selected State
           ----------------------------------------------- */

        thumbnail.classList.add(
          'animal-food-gallery__thumbnail--selected'
        );


        thumbnail.setAttribute(
          'aria-current',
          'true'
        );


        /* -----------------------------------------------
           Update Current Index
           ----------------------------------------------- */

        currentIndex = index;

        /* -----------------------------------------------
   Update Navigation Visibility
   ----------------------------------------------- */

if (previousButton) {
  previousButton.hidden = currentIndex === 0;
}

if (nextButton) {
  nextButton.hidden =
    currentIndex === thumbnails.length - 1;
}

      };


      /* ---------------------------------------------------
         Thumbnail Click
         --------------------------------------------------- */

      thumbnails.forEach(
        (thumbnail, index) => {

          thumbnail.addEventListener(
            'click',
            () => {

              selectImage(index);

            }
          );

        }
      );


      /* ---------------------------------------------------
   Previous Image
   --------------------------------------------------- */

if (previousButton) {

  previousButton.addEventListener(
    'click',
    () => {

      if (currentIndex <= 0) {
        return;
      }

      selectImage(currentIndex - 1);

    }
  );

}

      /* ---------------------------------------------------
   Next Image
   --------------------------------------------------- */

if (nextButton) {

  nextButton.addEventListener(
    'click',
    () => {

      if (
        currentIndex >=
        thumbnails.length - 1
      ) {
        return;
      }

      selectImage(currentIndex + 1);

    }
  );

}

    }


    /* =====================================================
       Variant Selection
       ===================================================== */

    const variantOptions = Array.from(
      gallery.querySelectorAll(
        '.animal-food-gallery__variant-option'
      )
    );


    const productPrice = gallery.querySelector(
      '[data-product-price]'
    );


    const productComparePrice =
      gallery.querySelector(
        '[data-product-compare-price]'
      );


    /* -----------------------------------------------------
       Variant Click
       ----------------------------------------------------- */

    variantOptions.forEach((option) => {

      option.addEventListener(
        'click',
        () => {

          if (option.disabled) {
            return;
          }


          /* -----------------------------------------------
             Remove Selected State
             ----------------------------------------------- */

          variantOptions.forEach((item) => {

            item.classList.remove(
              'animal-food-gallery__variant-option--selected'
            );


            item.setAttribute(
              'aria-pressed',
              'false'
            );

          });


          /* -----------------------------------------------
             Add Selected State
             ----------------------------------------------- */

          option.classList.add(
            'animal-food-gallery__variant-option--selected'
          );


          option.setAttribute(
            'aria-pressed',
            'true'
          );


          /* -----------------------------------------------
             Get Variant Price
             ----------------------------------------------- */

          const variantPrice =
            option.dataset.variantPrice;


          const variantComparePrice =
            option.dataset.variantComparePrice;


          /* -----------------------------------------------
             Update Product Price
             ----------------------------------------------- */

          if (
            productPrice &&
            variantPrice
          ) {

            productPrice.textContent =
              variantPrice;

          }


          /* -----------------------------------------------
             Update Compare-at Price
             ----------------------------------------------- */

          if (productComparePrice) {

            if (variantComparePrice) {

              productComparePrice.textContent =
                variantComparePrice;


              productComparePrice.hidden =
                false;

            } else {

              productComparePrice.textContent =
                '';


              productComparePrice.hidden =
                true;

            }

          }

        }
      );

    });

  });

});