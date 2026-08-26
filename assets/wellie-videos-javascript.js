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
           Play Video
           
           This function is shared by:
           - Play button
           - Video click
           - Hover
           ================================================= */

        const playVideo = async () => {

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
           * This is important for browser autoplay
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
           Toggle Video
           
           This function belongs INSIDE the card loop
           because it needs access to:
           
           - video
           - card
           - stopAllVideos()
           - playVideo()
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

          await playVideo();

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
           Hover Autoplay
           
           Desktop mouse interaction:
           
           Mouse enters video
           → Play video
           
           Mouse leaves video
           → Pause video
           ================================================= */

        video.addEventListener(
          'mouseenter',
          () => {

            playVideo();

          }
        );


        video.addEventListener(
          'mouseleave',
          () => {

            video.pause();


            setPlayingState(
              card,
              false
            );

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
   Mobile Autoplay When Video Enters View
   ===================================================== */

if ('IntersectionObserver' in window) {

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        const card = entry.target;
        const video = getVideo(card);

        if (!video) {
          return;
        }

        /*
         * Only enable viewport autoplay on mobile.
         */
        const isMobile = window.matchMedia(
          '(max-width: 749px)'
        ).matches;


        /* ===============================================
           VIDEO ENTERS VIEW
           =============================================== */

        if (entry.isIntersecting && isMobile) {

          /*
           * Stop every other video first.
           */
          stopAllVideos(video);


          /*
           * Make sure autoplay requirements
           * are satisfied.
           */
          video.muted = true;
          video.playsInline = true;


          if (video.readyState === 0) {
            video.load();
          }


          /*
           * Start the video.
           */
          video.play()
            .then(() => {

              setPlayingState(
                card,
                true
              );

            })
            .catch((error) => {

              console.error(
                'Unable to autoplay product video:',
                error
              );

              setPlayingState(
                card,
                false
              );

            });

          return;
        }


        /* ===============================================
           VIDEO LEAVES VIEW
           =============================================== */

        if (!entry.isIntersecting) {

          video.pause();

          setPlayingState(
            card,
            false
          );

        }

      });

    },
    {
      /*
       * The observer watches visibility inside
       * the horizontal video carousel.
       */
      root: carousel,

      /*
       * Start playing when at least 50% of the
       * card is visible.
       */
      threshold: 0.5
    }
  );


  cards.forEach((card) => {

    observer.observe(card);

  });

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