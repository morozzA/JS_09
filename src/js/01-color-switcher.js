const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let timerId = null;

startBtn.addEventListener('click', changeColorBody);
stopBtn.addEventListener('click', stopChangeColorBody);

stopBtn.disabled = true;

function changeColorBody(e) {
  timerId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function stopChangeColorBody(e) {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;

}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }