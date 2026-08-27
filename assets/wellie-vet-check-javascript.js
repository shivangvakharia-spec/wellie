(() => {

  /* =======================================================
     Initialize Vet Check
     ======================================================= */

  const initVetCheck = (root) => {

    if (!root) {
      return;
    }

    const buttons = root.querySelectorAll(
      '[data-vet-copy]'
    );

    if (!buttons.length) {
      return;
    }


    buttons.forEach((button) => {

      if (button.dataset.initialized === 'true') {
        return;
      }

      button.dataset.initialized = 'true';


      button.addEventListener('click', async () => {

        const text = button.dataset.copyText;

        if (!text) {
          return;
        }


        try {

          await navigator.clipboard.writeText(text);

          button.classList.add('is-copied');

          const label =
            button.querySelector(
              '.wellie-vet-check__copy-label'
            );

          if (label) {

            const originalText =
              label.textContent;

            label.textContent = 'Copied!';

            setTimeout(() => {

              label.textContent = originalText;

              button.classList.remove(
                'is-copied'
              );

            }, 1500);

          }

        } catch (error) {

          console.error(
            'Unable to copy vet message:',
            error
          );

        }

      });

    });

  };


  /* =======================================================
     Reorder Before Suggestions On Mobile
     ======================================================= */

  const MOBILE_QUERY = '(max-width: 749px)';

  const reorderForMobile = () => {

    const vetCheckSection = document.querySelector(
      '.wellie-vet-check-section'
    );

    const suggestionsSection = document.querySelector(
      '.wellie-suggestions'
    );

    if (!vetCheckSection || !suggestionsSection) {
      return;
    }

    const parent = suggestionsSection.parentNode;

    if (!parent || parent !== vetCheckSection.parentNode) {
      return;
    }

    const isMobile = window.matchMedia(MOBILE_QUERY).matches;

    if (isMobile) {

      if (vetCheckSection.nextElementSibling !== suggestionsSection) {
        parent.insertBefore(vetCheckSection, suggestionsSection);
      }

    } else if (suggestionsSection.nextElementSibling !== vetCheckSection) {

      parent.insertBefore(suggestionsSection, vetCheckSection);

    }

  };


  const mobileMediaQuery = window.matchMedia(MOBILE_QUERY);

  if (mobileMediaQuery.addEventListener) {

    mobileMediaQuery.addEventListener(
      'change',
      reorderForMobile
    );

  } else if (mobileMediaQuery.addListener) {

    mobileMediaQuery.addListener(reorderForMobile);

  }


  /* =======================================================
     Initial Load
     ======================================================= */

  const init = () => {

    document
      .querySelectorAll('.wellie-vet-check')
      .forEach(initVetCheck);

    reorderForMobile();

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
          '.wellie-vet-check'
        );

      if (section) {
        initVetCheck(section);
      }

      reorderForMobile();

    }
  );

})();