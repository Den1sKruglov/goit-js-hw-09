const refs = {
  getStartBtn: document.querySelector('[data-start]'),
  getStopBtn: document.querySelector('[data-stop]'),
  getBody: document.querySelector('body'),
}

refs.getStartBtn.addEventListener("click", clickStart);
refs.getStopBtn.addEventListener("click", clickStop);

refs.getStopBtn.disabled = true;
let intervalId = 0;

function clickStart() {
  refs.getStartBtn.disabled = true;
  refs.getStopBtn.disabled = false;
  intervalId = setInterval(() => {
  refs.getBody.style.backgroundColor = getRandomHexColor();
  }, 1000);

}

function clickStop() {
  clearTimeout(intervalId);
  refs.getStartBtn.disabled = false;
  refs.getStopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


