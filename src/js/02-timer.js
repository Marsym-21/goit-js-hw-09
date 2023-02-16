import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
localStorageReset();
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
ref.startBtn.addEventListener('click', convertMs);
const delay = 1000;

function getValue(event) {
  const checkedDate = new Date(event.target.value);
  options.onClose(checkedDate);
}

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
    console.log(differenceNumber);
    localStorage.setItem('DATA_INPUT', `${differenceNumber}`);
  },
};

flatpickr(ref.input, { options });
console.log(localStorage.getItem('DATA_INPUT'));
const differenceData = localStorage.getItem('DATA_INPUT');
console.log(differenceData);

convertMs(differenceData);

function convertMs(ms) {
  console.log(ms);
  timer(ms);

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

function timer(time) {
  console.log(time);
  time -= time;
  console.log(time);
}

function localStorageReset() {
  localStorage.removeItem('DATA_INPUT');
}
