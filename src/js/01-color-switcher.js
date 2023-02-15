function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let timerId = null;
const ref = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stoptBtn: document.querySelector('button[data-stop]'),
};

ref.startBtn.addEventListener('click', getRandomBodyColor);
ref.stoptBtn.addEventListener('click', getRandomBodyColorStop);

function getRandomBodyColor() {
  ref.startBtn.setAttribute('disabled', '');
  timerId = setInterval(() => {
    ref.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function getRandomBodyColorStop() {
  clearInterval(timerId);
  ref.startBtn.removeAttribute('disabled');
}
