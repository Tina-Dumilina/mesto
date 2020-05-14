//ТЕКСТ ОШИБОК
const errorMessages = {
  required: 'Это обязательное поле',
  wrongLength: 'Должно быть от 2 до 30 символов',
  wrongUrl: 'Здесь должна быть ссылка'
}

//ФУНКЦИЯ ДОБАВЛЕНИЯ ОБРАБОТЧИКОВ
function setEventListeners(event) {
  const button = event.currentTarget.querySelector('.popup__button');
  const inputs = Array.from(event.currentTarget.elements);

  isFieldValid(event.target);

  if (inputs.every(checkInputValidity)) {
    setSubmitButtonState(button, true);
  } else {
    setSubmitButtonState(button, false);
  }
}

// ФУНКЦИЯ, МЕНЯЮЩАЯ СОСТОЯНИЕ КНОПКИ
function setSubmitButtonState(button, state) {
  if (state) {
    button.removeAttribute('disabled');
  } else {
    button.setAttribute('disabled', true);
  }
}

// ПРОВЕРКА ВАЛИДНОСТИ ВСЕЙ ФОРМЫ
function isFormValid(form) {
  const inputs = [...form.elements];
  let valid = false;

  inputs.forEach(input => {
    if (input.type !== 'submit' && input.type !== 'button') {
      if (isFieldValid(input)) valid = true;
    }
  });

  return valid;
}

//СБРОС ОШИБКИ
function resetError(input) {
  if (input.type !== 'submit' && input.type !== 'button') {
    const errorElem = input.parentNode.querySelector(`#${input.id}-error`);
    errorElem.textContent = '';
  }
}

// ПРОВЕРКА ВАЛИДНОСТИ ИНПУТА
function isFieldValid(input) {
  const errorElement = input.parentNode.querySelector(`#${input.id}-error`);
  return checkInputValidity(input, errorElement);
}

function checkInputValidity(input, errorElement) {
  errorElement.textContent = '';

  if (input.validity.valueMissing) {
    errorElement.textContent = errorMessages.required;
    return false;
  }

  if (input.validity.tooShort || input.validity.tooLong) {
    errorElement.textContent = errorMessages.wrongLength;
    return false;
  }

  if (input.validity.typeMismatch && input.type === 'url') {
    errorElement.textContent = errorMessages.wrongUrl;
    return false;
  }

  return true;
}
