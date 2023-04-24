const btnVent = document.querySelector('.tab-slider__button--left');
const btnCond = document.querySelector('.tab-slider__button--right');
const slideVent = document.querySelector('.tab-slider__slide--vent');
const slideCond = document.querySelector('.tab-slider__slide--cond');

btnVent.addEventListener('click', () => {
  if (!btnVent.classList.contains('tab-slider__button--active')) {
    btnVent.classList.add('tab-slider__button--active');
    slideVent.classList.add('tab-slider__slide--active');
    btnCond.classList.remove('tab-slider__button--active');
    slideCond.classList.remove('tab-slider__slide--active');
  }
});

btnCond.addEventListener('click', () => {
  if (!btnCond.classList.contains('tab-slider__button--active')) {
    btnCond.classList.add('tab-slider__button--active');
    slideCond.classList.add('tab-slider__slide--active');
    btnVent.classList.remove('tab-slider__button--active');
    slideVent.classList.remove('tab-slider__slide--active');
  }
});
