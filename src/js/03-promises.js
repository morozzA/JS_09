import Notiflix from 'notiflix';

const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', clickOnSubmitBtn);

function clickOnSubmitBtn(e) {
  e.preventDefault();

  let amount = amountEl.value;
  let delay = +delayEl.value;
  let step = +stepEl.value;
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
    .then(({ position, delay }) => {
      setTimeout(() => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);}
      , delay)})
    .catch(({ position, delay }) => {
      setTimeout(() => {
        Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);}
      , delay)});
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
  if (shouldResolve) {
    resolve({ position, delay});
  } else {
    reject({ position, delay });
  }
})
};
