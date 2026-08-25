(() => {

  /* =======================================================
     Initialize Reviews Carousel
     ======================================================= */

  const initReviewsCarousel = (root) => {

    const carousel = root.querySelector(
      '[data-reviews-carousel]'
    );

    const dots = [
      ...root.querySelectorAll('[data-review-dot]')
    ];

    const cards = [
      ...root.querySelectorAll('[data-review-card]')
    ];


    /*
     * Nothing to initialize if there is no carousel
     * or only one review.
     */

    if (!carousel || cards.length < 2) {
      return;
    }


    /* =====================================================
       Set Active Pagination Dot
       ===================================================== */

    const setActiveDot = (index) => {

      dots.forEach((dot, dotIndex) => {

        const active = dotIndex === index;


        dot.classList.toggle(
          'wellie-reviews__dot--active',
          active
        );


        dot.setAttribute(
          'aria-current',
          active ? 'true' : 'false'
        );

      });

    };


    /* =====================================================
       Find Currently Visible Card
       ===================================================== */

    const getClosestCardIndex = () => {

      const scrollLeft = carousel.scrollLeft;

      let closestIndex = 0;

      let closestDistance = Infinity;


      cards.forEach((card, index) => {

        const distance = Math.abs(
          card.offsetLeft -
          carousel.offsetLeft -
          scrollLeft
        );


        if (distance < closestDistance) {

          closestDistance = distance;

          closestIndex = index;

        }

      });


      return closestIndex;
    };


    /* =====================================================
       Update Dot While User Scrolls
       ===================================================== */

    let scrollTimer;


    carousel.addEventListener(
      'scroll',
      () => {

        window.clearTimeout(scrollTimer);


        scrollTimer = window.setTimeout(() => {

          const activeIndex =
            getClosestCardIndex();


          setActiveDot(activeIndex);

        }, 50);

      },
      {
        passive: true
      }
    );


    /* =====================================================
       Dot Navigation
       ===================================================== */

    dots.forEach((dot) => {

      dot.addEventListener(
        'click',
        () => {

          const index = Number(
            dot.dataset.reviewDot
          );


          const card = cards[index];


          if (!card) {
            return;
          }


          carousel.scrollTo({
            left:
              card.offsetLeft -
              carousel.offsetLeft,

            behavior: 'smooth'
          });

        }
      );

    });

  };


  /* =======================================================
     Initialize All Review Sections
     ======================================================= */

  const init = () => {

    document
      .querySelectorAll('.wellie-reviews')
      .forEach(initReviewsCarousel);

  };


  /* =======================================================
     Initial Page Load
     ======================================================= */

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
          '.wellie-reviews'
        );


      if (section) {

        initReviewsCarousel(section);

      }

    }
  );

})();