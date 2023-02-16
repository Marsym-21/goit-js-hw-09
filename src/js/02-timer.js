import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const ref = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
};

console.log('what a fuck ?');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  minDate: 'today',
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr(ref.input, { options });
