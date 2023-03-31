const nav = document.querySelector('.navigation');
const menuBtn = nav.querySelector('.button-menu');
const navList = nav.querySelector('.navigation__list');
const connectBtn = nav.querySelector('.navigation__connect-button');

const ecsEvt = e => {
  return e.key === 'Escape' || e.key === 'Esc';
};

const escKeydown = (e, fn) => {
  if (ecsEvt(e)) {
    e.preventDefault();
    fn();
  };
}

const onMenuEscKeydown = e => escKeydown(e, closeMenu);

const isMenuActive = () => menuBtn.classList.contains('button-menu--active');

const toggleMenu = () => {
  nav.classList.toggle('navigation--active');
  menuBtn.classList.toggle('button-menu--active');
  navList.classList.toggle('navigation__list--active');
  connectBtn.classList.toggle('navigation__connect-button--active');
}

const showMenu = () => {
  toggleMenu();
  document.addEventListener('keydown', onMenuEscKeydown);
};

const closeMenu = () => {
  toggleMenu();
  document.removeEventListener('keydown', onMenuEscKeydown);
};

menuBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (!isMenuActive()) {
    showMenu();
  } else {
    closeMenu();
  }
});
