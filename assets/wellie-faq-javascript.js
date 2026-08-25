(() => {

  /* =======================================================
     Initialize FAQ
     ======================================================= */

  const initFaq = (root) => {

    if (!root) {
      return;
    }


    const questions = root.querySelectorAll(
      '.wellie-faq__question'
    );


    if (!questions.length) {
      return;
    }


    questions.forEach((question) => {

      /*
       * Prevent duplicate event listeners when
       * Shopify Theme Editor reloads the section.
       */

      if (question.dataset.faqInitialized === 'true') {
        return;
      }


      question.dataset.faqInitialized = 'true';


      question.addEventListener('click', () => {

        const item = question.closest(
          '.wellie-faq__item'
        );


        const answerId =
          question.getAttribute('aria-controls');


        const answer =
          document.getElementById(answerId);


        if (!item || !answer) {
          return;
        }


        const isOpen =
          question.getAttribute('aria-expanded') === 'true';


        /* -----------------------------------------------
           Close all other FAQs
           ----------------------------------------------- */

        const allItems =
          root.querySelectorAll(
            '.wellie-faq__item'
          );


        allItems.forEach((otherItem) => {

          const otherQuestion =
            otherItem.querySelector(
              '.wellie-faq__question'
            );


          const otherAnswer =
            otherItem.querySelector(
              '.wellie-faq__answer-wrapper'
            );


          if (!otherQuestion || !otherAnswer) {
            return;
          }


          otherItem.classList.remove('is-open');

          otherQuestion.setAttribute(
            'aria-expanded',
            'false'
          );

          otherAnswer.hidden = true;

        });


        /* -----------------------------------------------
           Open clicked FAQ
           ----------------------------------------------- */

        if (!isOpen) {

          item.classList.add('is-open');

          question.setAttribute(
            'aria-expanded',
            'true'
          );

          answer.hidden = false;

        }

      });

    });

  };


  /* =======================================================
     Initial Page Load
     ======================================================= */

  const init = () => {

    document
      .querySelectorAll('.wellie-faq')
      .forEach(initFaq);

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
     Shopify Theme Editor Support
     ======================================================= */

  document.addEventListener(
    'shopify:section:load',
    (event) => {

      const section =
        event.target.querySelector?.(
          '.wellie-faq'
        );


      if (section) {
        initFaq(section);
      }

    }
  );

})();