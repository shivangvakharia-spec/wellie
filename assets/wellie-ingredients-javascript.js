(() => {

  /* =======================================================
     Initialize Ingredient Section
     ======================================================= */

  const initIngredients = (root) => {

    const readMoreButtons = [
      ...root.querySelectorAll(
        '[data-ingredient-read-more]'
      )
    ];


    if (
      readMoreButtons.length === 0
    ) {
      return;
    }


    /* =====================================================
       Read More
       ===================================================== */

    readMoreButtons.forEach(
      (button) => {

        button.addEventListener(
          'click',
          () => {

            const card =
              button.closest(
                '.wellie-ingredients__card'
              );


            if (!card) {
              return;
            }


            const expanded =
              card.classList.toggle(
                'is-expanded'
              );


            button.setAttribute(
              'aria-expanded',
              expanded
                ? 'true'
                : 'false'
            );

          }
        );

      }
    );

  };


  /* =======================================================
     Initialize All Ingredient Sections
     ======================================================= */

  const init = () => {

    document
      .querySelectorAll(
        '.wellie-ingredients'
      )
      .forEach(
        initIngredients
      );

  };


  /* =======================================================
     Initial Page Load
     ======================================================= */

  if (
    document.readyState ===
    'loading'
  ) {

    document.addEventListener(
      'DOMContentLoaded',
      init
    );

  } else {

    init();

  }


  /* =======================================================
     Shopify Theme Editor Support
     ======================================================= */

  document.addEventListener(
    'shopify:section:load',
    (event) => {

      const section =
        event.target.querySelector?.(
          '.wellie-ingredients'
        );


      if (section) {

        initIngredients(
          section
        );

      }

    }
  );

})();