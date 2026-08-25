(() => {

  /* =======================================================
     Initialize Pet Benefits
     ======================================================= */

  const initPetBenefits = (root) => {

    if (!root) {
      return;
    }


    const benefits = root.querySelectorAll(
      '[data-pet-benefit]'
    );


    if (!benefits.length) {
      return;
    }


    /*
     * The benefit numbers and content are rendered
     * directly by Liquid.
     *
     * JavaScript is only responsible for making sure
     * the section can safely initialize again when
     * Shopify Theme Editor reloads the section.
     */

    root.classList.add('is-initialized');

  };


  /* =======================================================
     Initial Page Load
     ======================================================= */

  const init = () => {

    document
      .querySelectorAll('.wellie-pet-benefits')
      .forEach(initPetBenefits);

  };


  if (
    document.readyState === 'loading'
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
          '.wellie-pet-benefits'
        );


      if (section) {

        initPetBenefits(section);

      }

    }
  );


})();