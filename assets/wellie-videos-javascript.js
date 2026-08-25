(() => {

  /* =======================================================
     Initialize Video Carousel
     ======================================================= */

  const initVideosCarousel = (root) => {

    const carousel = root.querySelector(
      '[data-videos-carousel]'
    );

    const cards = [
      ...root.querySelectorAll('[data-video-card]')
    ];

    const nextButton = root.querySelector(
      '[data-videos-next]'
    );

    const previousButton = root.querySelector(
  '[data-videos-previous]'
);


    /* =====================================================
       Nothing to initialize
       ===================================================== */

    if (!carousel || cards.length === 0) {
      return;
    }


    /* =====================================================
       Get Video From Card
       ===================================================== */

    const getVideo = (card) => {

      return card.querySelector(
        '.wellie-videos__video'
      );

    };


    /* =====================================================
       Set Playing State
       ===================================================== */

    const setPlayingState = (
      card,
      isPlaying
    ) => {

      card.classList.toggle(
        'is-playing',
        isPlaying
      );


      const playButton =
        card.querySelector(
          '[data-video-play]'
        );


      if (!playButton) {
        return;
      }


      playButton.setAttribute(
        'aria-label',
        isPlaying
          ? 'Pause video'
          : 'Play video'
      );

    };


    /* =====================================================
       Stop All Videos
       ===================================================== */

    const stopAllVideos = (
      except = null
    ) => {

      cards.forEach(
        (card) => {

          const video =
            getVideo(card);


          if (
            !video ||
            video === except
          ) {
            return;
          }


          video.pause();


          setPlayingState(
            card,
            false
          );

        }
      );

    };


    /* =====================================================
       Initialize Each Video Card
       ===================================================== */

    cards.forEach(
      (card) => {

        const video =
          getVideo(card);


        const playButton =
          card.querySelector(
            '[data-video-play]'
          );


        if (
          !video ||
          !playButton
        ) {
          return;
        }


        /* =================================================
           Video Configuration
           ================================================= */

        video.muted = true;

        video.playsInline = true;


        video.setAttribute(
          'muted',
          ''
        );


        video.setAttribute(
          'playsinline',
          ''
        );


        /* =================================================
           Toggle Video
           
           This function belongs INSIDE the card loop
           because it needs access to:
           
           - video
           - card
           - stopAllVideos()
           ================================================= */

        const toggleVideo = async () => {


          /* ===============================================
             VIDEO IS PLAYING
             → PAUSE
             =============================================== */

          if (
            !video.paused
          ) {

            video.pause();


            setPlayingState(
              card,
              false
            );


            return;

          }


          /* ===============================================
             VIDEO IS PAUSED
             → PLAY
             =============================================== */

          /*
           * Stop any other video that may currently
           * be playing.
           */

          stopAllVideos(
            video
          );


          /*
           * Make sure the video has loaded.
           */

          if (
            video.readyState === 0
          ) {

            video.load();

          }


          /*
           * Keep the video muted.
           *
           * This is important for browser playback
           * restrictions.
           */

          video.muted = true;


          try {

            await video.play();


            /*
             * Video successfully started.
             */

            setPlayingState(
              card,
              true
            );

          } catch (error) {

            console.error(
              'Unable to play product video:',
              error
            );


            setPlayingState(
              card,
              false
            );

          }

        };


        /* =================================================
           Play Button Click
           ================================================= */

        playButton.addEventListener(
          'click',
          (event) => {

            event.preventDefault();

            event.stopPropagation();


            toggleVideo();

          }
        );


        /* =================================================
           Video Click
           
           When the video is already playing, the play
           button becomes invisible. Therefore the video
           itself must also be clickable.
           ================================================= */

        video.addEventListener(
          'click',
          (event) => {

            event.preventDefault();

            event.stopPropagation();


            toggleVideo();

          }
        );


        /* =================================================
           Video Started Playing
           ================================================= */

        video.addEventListener(
          'playing',
          () => {

            setPlayingState(
              card,
              true
            );

          }
        );


        /* =================================================
           Video Paused
           ================================================= */

        video.addEventListener(
          'pause',
          () => {

            setPlayingState(
              card,
              false
            );

          }
        );


        /* =================================================
           Video Ended
           ================================================= */

        video.addEventListener(
          'ended',
          () => {

            setPlayingState(
              card,
              false
            );

          }
        );


        /* =================================================
           Video Error
           ================================================= */

        video.addEventListener(
          'error',
          () => {

            console.error(
              'Product video failed to load:',
              video.error
            );


            setPlayingState(
              card,
              false
            );

          }
        );

      }
    );


    /* =====================================================
       Find Closest Card
       ===================================================== */

    const getClosestCardIndex = () => {

      const scrollLeft =
        carousel.scrollLeft;


      let closestIndex = 0;

      let closestDistance =
        Infinity;


      cards.forEach(
        (card, index) => {

          const distance =
            Math.abs(
              card.offsetLeft -
              carousel.offsetLeft -
              scrollLeft
            );


          if (
            distance <
            closestDistance
          ) {

            closestDistance =
              distance;


            closestIndex =
              index;

          }

        }
      );


      return closestIndex;

    };


/* =====================================================
   Previous / Next Buttons
   ===================================================== */

const updateNavigationButtons = () => {

  /*
   * Are we at the beginning?
   */

  const atStart =
    carousel.scrollLeft <= 1;


  /*
   * Are we at the end?
   */

  const atEnd =
    carousel.scrollLeft +
    carousel.clientWidth >=
    carousel.scrollWidth - 1;


  if (previousButton) {

    previousButton.disabled =
      atStart;

  }


  if (nextButton) {

    nextButton.disabled =
      atEnd;

  }

};


/* =====================================================
   Previous Button
   ===================================================== */

if (previousButton) {

  previousButton.addEventListener(
    'click',
    (event) => {

      event.preventDefault();
      event.stopPropagation();


      const currentIndex =
        getClosestCardIndex();


      const previousIndex =
        Math.max(
          currentIndex - 1,
          0
        );


      const previousCard =
        cards[previousIndex];


      if (!previousCard) {
        return;
      }


      stopAllVideos();


      carousel.scrollTo({

        left:
          previousCard.offsetLeft -
          carousel.offsetLeft,

        behavior: 'smooth'

      });

    }
  );

}


/* =====================================================
   Next Button
   ===================================================== */

if (nextButton) {

  nextButton.addEventListener(
    'click',
    (event) => {

      event.preventDefault();
      event.stopPropagation();


      const currentIndex =
        getClosestCardIndex();


      const nextIndex =
        Math.min(
          currentIndex + 1,
          cards.length - 1
        );


      const nextCard =
        cards[nextIndex];


      if (!nextCard) {
        return;
      }


      stopAllVideos();


      carousel.scrollTo({

        left:
          nextCard.offsetLeft -
          carousel.offsetLeft,

        behavior: 'smooth'

      });

    }
  );

}


/* =====================================================
   Update Navigation While Scrolling
   ===================================================== */

carousel.addEventListener(
  'scroll',
  updateNavigationButtons,
  {
    passive: true
  }
);


/*
 * Set the correct initial state.
 */

updateNavigationButtons();

    /* =====================================================
       Pause Videos When They Leave View
       ===================================================== */

    if (
      'IntersectionObserver' in window
    ) {

      const observer =
        new IntersectionObserver(
          (entries) => {

            entries.forEach(
              (entry) => {

                /*
                 * If the card is still sufficiently
                 * visible, do nothing.
                 */

                if (
                  entry.isIntersecting
                ) {

                  return;

                }


                const video =
                  getVideo(
                    entry.target
                  );


                if (!video) {
                  return;
                }


                /*
                 * Pause video when its card leaves
                 * the visible carousel area.
                 */

                video.pause();


                setPlayingState(
                  entry.target,
                  false
                );

              }
            );

          },
          {
            root: carousel,

            threshold: 0.5

          }
        );


      cards.forEach(
        (card) => {

          observer.observe(
            card
          );

        }
      );

    }

  };


  /* =======================================================
     Initialize All Video Sections
     ======================================================= */

  const init = () => {

    document
      .querySelectorAll(
        '.wellie-videos'
      )
      .forEach(
        initVideosCarousel
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
          '.wellie-videos'
        );


      if (section) {

        initVideosCarousel(
          section
        );

      }

    }
  );

})();