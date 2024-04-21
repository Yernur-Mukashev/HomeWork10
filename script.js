  const menuActive = document.querySelector(".menu-active");
  const burger = document.querySelector(".header-menuRight__btn-menu");
  const menuClose = document.querySelector(".menu-close");

  function toggleMenu() {
    menuActive.classList.toggle("hidden");
  }

  burger.addEventListener("click", toggleMenu);
  menuClose.addEventListener("click", toggleMenu);
