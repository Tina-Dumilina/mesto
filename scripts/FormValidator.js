class FormValidator {
  constructor(form) {
    this._form = form;
  }

  isFormValid() {
    const inputs = [...this._form.elements];
    let valid = false;
  
    inputs.forEach(input => {
      if (input.type !== 'submit' && input.type !== 'button') {
        if (this._isFieldValid(input)) valid = true;
      }
    });
  
    return valid;
  }

  setEventListeners(event) {
    const button = this._form.querySelector('.popup__button');
    const inputs = [...this._form.elements];
  
    this._isFieldValid(event.target);
  
    if (inputs.every(this._checkInputValidity)) {
      this.setSubmitButtonState(button, true);
    } else {
      this.setSubmitButtonState(button, false);
    }
  }

  _isFieldValid(input) {
    const errorElement = input.parentNode.querySelector(`#${input.id}-error`);
    const valid = this._checkInputValidity(input); 
    errorElement.textContent = input.validationMessage;
    return valid;
  }

  _checkInputValidity(input) {
    input.setCustomValidity('');

    if (input.validity.valueMissing) {
      input.setCustomValidity('Это обязательное поле');
      return false;
    }
  
    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity('Должно быть от 2 до 30 символов');
      return false;
    }
  
    if (input.validity.typeMismatch && input.type === 'url') {
      input.setCustomValidity('Здесь должна быть ссылка');
      return false;
    }
  
    return true;
  }

  setSubmitButtonState(button, state) {
    if (state) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', true);
    }
  }

  resetError(input) {
    if (input.type !== 'submit' && input.type !== 'button') {
      const errorElem = input.parentNode.querySelector(`#${input.id}-error`);
      errorElem.textContent = '';
    }
  }
}