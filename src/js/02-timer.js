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
  body: document.querySelector('body'),
};
ref.startBtn.setAttribute('disabled', '');
ref.startBtn.addEventListener('click', getReightTime);
const delay = 1000;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates) {
    const differenceNumber = selectedDates[0].getTime() - this.now.getTime();
    ref.startBtn.removeAttribute('disabled');

    if (differenceNumber < 0) {
      ref.startBtn.setAttribute('disabled', '');
      return Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      Notiflix.Notify.success('Very good, сlick on "START" !');
    }
  },
};

const datePickr = flatpickr(ref.input, options);

let timerId;

function getReightTime() {
  let differenceDate =
    datePickr.selectedDates[0].getTime() - datePickr.now.getTime();

  timerId = setInterval(() => {
    differenceDate -= 1000;
    convertMs(differenceDate);
  }, 1000);
  // ref.startBtn.setAttribute('disabled', '');
}

function convertMs(ms) {
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
  const allTime =
    ref.day.textContent +
    ref.hour.textContent +
    ref.minute.textContent +
    ref.second.textContent;
  if (allTime === '00000000') {
    console.log('STOP');
    clearTimeout(timerId);
    ref.body.style.backgroundColor = 'tomato';
  }

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  for (const key in value) {
    const string = String(value[key]);
    const length = string.length;
    if (length === 1) {
      value[key] = string.padStart(2, '0');
    }
  }
  return value;
}
