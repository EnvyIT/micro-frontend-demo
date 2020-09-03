(function () {

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
    })}

  attachBurgerMenuLister();
})();
