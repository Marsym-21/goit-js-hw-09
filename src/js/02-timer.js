import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const ref = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  day: document.querySelector('span[data-days]'),
  hour: document.querySelector('span[data-hours]'),
  minute: document.querySelector('span[data-minutes]'),
  second: document.querySelector('span[data-seconds]'),
};
ref.startBtn.setAttribute('disabled', '');
ref.input.addEventListener('input', getValue);
ref.startBtn.addEventListener('click', countdown);
const delay = 1000;
let checkedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  minDate: 'today',

  onClose(selectedDates) {
    const differenceNumber = selectedDates - this.defaultDate;

    if (differenceNumber < 0) {
      if (!ref.startBtn.hasAttribute('disabled')) {
        ref.startBtn.setAttribute('disabled', '');
      }
      return window.alert('Please choose a date in the future');
    }
    ref.startBtn.removeAttribute('disabled');
    console.log(this.differenceNumber);
    convertMs(differenceNumber);
  },
};

flatpickr(ref.input, { options });

function getValue(event) {
  checkedDate = new Date(event.target.value);
  console.log(checkedDate);
}
console.log(checkedDate);
options.onClose(checkedDate);

function convertMs(ms) {
  countdown(ms);
  console.log(ms);

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const values = {
    days: Math.floor(`${ms}` / `${day}`),
    hours: Math.floor((`${ms}` % `${day}`) / `${hour}`),
    minutes: Math.floor(((`${ms}` % `${day}`) % `${hour}`) / `${minute}`),
    seconds: Math.floor(
      (((`${ms}` % `${day}`) % `${hour}`) % `${minute}`) / `${second}`
    ),
  };

  const { days, hours, minutes, seconds } = values;

  addLeadingZero(values);
  ref.day.textContent = values.days;
  ref.hour.textContent = values.hours;
  ref.minute.textContent = values.minutes;
  ref.second.textContent = values.seconds;

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  for (const key in value) {
    const string = String(value[key]);
    const length = string.length;
    if (length < 2) {
      value[key] = string.padStart(2, '0');
    }
  }
  return value;
}

function countdown(time) {
  let timeNumber = Number(time);
  // console.log(timeNumber);
  timeNumber = timeNumber - 1000;
  // console.log(typeof timeNumber);
}

// setInterval(countdown, delay);
