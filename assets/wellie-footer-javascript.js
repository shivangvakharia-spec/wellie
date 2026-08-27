(() => {

  /* =======================================================
     Smooth Scroll To Top
     ======================================================= */

  const initBackToTop = (root) => {

    if (!root) {
      return;
    }

    const links = root.querySelectorAll(
      '[data-footer-back-to-top]'
    );

    if (!links.length) {
      return;
    }


    links.forEach((link) => {

      if (link.dataset.initialized === 'true') {
        return;
      }

      link.dataset.initialized = 'true';


      link.addEventListener('click', (event) => {

        event.preventDefault();

        const reduceMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;

        window.scrollTo({
          top: 0,
          behavior: reduceMotion ? 'auto' : 'smooth',
        });

      });

    });

  };


  /* =======================================================
     Initial Load
     ======================================================= */

  const init = () => {

    document
      .querySelectorAll('.wellie-footer')
      .forEach(initBackToTop);

  };


  if (document.readyState === 'loading') {

    document.addEventListener(
      'DOMContentLoaded',
      init
    );

  } else {

    init();

  }


  /* =======================================================
     Shopify Theme Editor
     ======================================================= */

  document.addEventListener(
    'shopify:section:load',
    (event) => {

      const section =
        event.target.querySelector?.(
          '.wellie-footer'
        );

      if (section) {
        initBackToTop(section);
      }

    }
  );

})();
