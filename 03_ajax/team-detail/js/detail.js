(function () {

  const FRAGMENT_ID = 'recommendation';

  const attachBurgerMenuLister = () => {
    document.addEventListener('DOMContentLoaded', () => {
      const navbarBurger = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
      if (navbarBurger.length > 0) {
        navbarBurger.forEach(element => {
          element.addEventListener('click', () => {
            const target = element.dataset.target;
            const $target = document.getElementById(target);
            element.classList.toggle('is-active');
            $target.classList.toggle('is-active');
          });
        });
      }
    })
  }

  const loadRecommendationPage = () => {
    const recommendation = document.getElementById(FRAGMENT_ID)
    const url = recommendation.getAttribute('data-fragment-url');
    window.fetch(url)
    .then(response => response.text())
    .then(html => {
      recommendation.innerHTML = html;
    });
  }

  const init = () => {
    attachBurgerMenuLister();
    loadRecommendationPage();
  }

  init();
})();
