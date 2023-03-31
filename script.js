'use strict';

const btn = document.querySelector('.btn-calculate');
const formItemAll = document.querySelectorAll('.form-item');
const validationMsgAll = document.querySelectorAll('.validation-msg');

const dayInput = document.querySelector('input#day');
const monthInput = document.querySelector('input#month');
const yearInput = document.querySelector('input#year');

const date = new Date();
const currYear = +date.getFullYear();

const setValidState = (className, err) => {
  const formItem = document.querySelector(`.form-item--${className}`);

  formItem.classList.add('invalid');

  formItem
    .querySelector(`.validation-msg[data-code="${err}"]`)
    .classList.remove('valid');

  console.log(err);
};

const checkEmptyInputs = () => {
  dayInput.value === '' && setValidState('day', 'required');
  monthInput.value === '' && setValidState('month', 'required');
  yearInput.value === '' && setValidState('year', 'required');

  const invalidItems = document.querySelectorAll('.invalid');

  if (invalidItems.length === 0) return false;

  return true;
};

const checkInvalidInputs = () => {
  if (dayInput.value !== '' && (+dayInput.value < 1 || +dayInput.value > 31)) {
    setValidState('day', 'invalid');
  }

  if (monthInput.value !== '' && (+monthInput.value < 1 || +monthInput > 12)) {
    setValidState('month', 'invalid');
  }

  if (yearInput.value !== '' && +dayInput.value > currYear) {
    setValidState('year', 'invalid');
  }

  const invalidItems = document.querySelectorAll('.invalid');

  if (invalidItems.length === 0) return false;

  return true;
};

const dateValidation = (yyyy, mm, dd) => {
  const d = new Date(+yyyy, +mm - 1, +dd);

  const year = +d.getFullYear();
  const month = +d.getMonth();
  const day = +d.getDate();

  if (year === +yyyy && month === +mm - 1 && day === +dd) {
    return true;
  }

  return false;
};

const calcAge = (yyyy, mm, dd) => {
  const birthDate = new Date(+yyyy, +mm - 1, +dd);
  const currDate = new Date();
  const calcCurrAge = (currDate - birthDate) / (1000 * 60 * 60 * 24);

  const currAgeYear = Math.trunc(calcCurrAge / 365);
  const currAgeMonth = Math.abs(
    Math.trunc((calcCurrAge - 365 * currAgeYear) / 12) - 12
  );
  const currAgeDay = Math.trunc((calcCurrAge - 365 * currAgeYear) / 30);

  return {
    year: currAgeYear,
    month: currAgeMonth,
    day: currAgeDay,
  };
};

btn.addEventListener('click', () => {
  // 0. Clear all invalid states
  for (const formItem of formItemAll) {
    formItem.classList.remove('invalid');
  }

  for (const validMsg of validationMsgAll) {
    validMsg.classList.add('valid');
  }

  // 1. Check if the inputs are empty
  const isEmpty = checkEmptyInputs();

  // 2. Check if the input values are valid
  const isInvalid = checkInvalidInputs();

  // 3. Check if the date is valid (e.g. February 29, 2023 is invalid)
  const isDateValid = dateValidation(
    yearInput.value,
    monthInput.value,
    dayInput.value
  );

  if (!isEmpty && !isInvalid && isDateValid) {
    const age = calcAge(yearInput.value, monthInput.value, dayInput.value);

    document.querySelector('.num--year').textContent = age.year;
    document.querySelector('.num--month').textContent = age.month;
    document.querySelector('.num--day').textContent = age.day;

    yearInput.value = '';
    monthInput.value = '';
    dayInput.value = '';
  }
});
