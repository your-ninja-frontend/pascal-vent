const portfolioSwiper = new Swiper('.portfolio__swiper', {
  spaceBetween: 30,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const clientsSwiper = new Swiper('.clients__swiper', {
  spaceBetween: 15,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    768: {
      spaceBetween: 20,
    }
  },
});
