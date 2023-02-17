const form = document.querySelector('.form');
form.addEventListener('input', checkedInputValue);
form.addEventListener('submit', clickSubmit);

const formData = {};
function checkedInputValue(event) {
  const name = event.target.name;
  const value = event.target.value;
  formData[name] = value;
}
let timerId = 0;
let timer = 0;

function clickSubmit(event) {
  event.preventDefault();

  let countDelay = Number(formData.delay);
  timerId = setInterval(() => {
    timer += 1;
    StopInterval(timer, Number(formData.amount));
    countDelay += Number(formData.step);
    createPromise(formData.amount, countDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }, countDelay);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

function StopInterval(time, amount) {
  if (time === amount) {
    clearInterval(timerId);
  }
}
