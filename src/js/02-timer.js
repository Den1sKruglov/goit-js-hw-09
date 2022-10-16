import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';




require("flatpickr/dist/themes/confetti.css");

Notify.init({
  width: '280px',
  position: 'center-top',
  timeout: 2000,

  cssAnimationStyle: 'zoom'
});

const refs = {
  getTimer: document.querySelector('.timer'),
  getInput: document.querySelector('#datetime-picker'),
  getStartBtn: document.querySelector('[data-start]'),
  getDays: document.querySelector('[data-days]'),
  getHours: document.querySelector('[data-hours]'),
  getMinutes: document.querySelector('[data-minutes]'),
  getSeconds: document.querySelector('[data-seconds]'),
};

refs.getStartBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    Notify.success('Success date, push start, please!');
    refs.getStartBtn.disabled = false;
    
    return;
  }
};

const flatpickrTime = flatpickr(refs.getInput, options);

refs.getStartBtn.addEventListener('click', getTimeFromCalendar)
function getTimeFromCalendar() {
  if (flatpickrTime.selectedDates[0].getTime() > Date.now()) {
     
      refs.getStartBtn.disabled = true;
      refs.getInput.disabled = true;

    const timerId = setInterval(() => {

      let deltaTime = flatpickrTime.selectedDates[0].getTime() - Date.now();
        
      timeUpdate(convertMs(deltaTime));
      finish(deltaTime, timerId);
        
    }, 1000
    )
  };
};

function finish(e, timerId) {
  if (e < 0) {
    clearInterval(timerId);
    Notify.success('Finish!');
    timeClear();
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
  return { days, hours, minutes, seconds };
};

function timeUpdate({ days, hours, minutes, seconds }) {
  refs.getDays.textContent = addLeadingZero(days);
  refs.getHours.textContent = addLeadingZero(hours);
  refs.getMinutes.textContent = addLeadingZero(minutes);
  refs.getSeconds.textContent = addLeadingZero(seconds);
  
};
  
const addLeadingZero = value => value.toString().padStart(2, 0);

function timeClear() {
  refs.getDays.textContent = '00';
  refs.getHours.textContent = '00';
  refs.getMinutes.textContent = '00';
  refs.getSeconds.textContent = '00';
};





