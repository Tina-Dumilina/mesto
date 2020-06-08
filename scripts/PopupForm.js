class PopupForm extends Popup {
  constructor(popup, createFormValidator) {
    super(popup);
    this._createFormValidator = createFormValidator;
  }

  open() {
    super.open();

    if (!this._popup.classList.contains('popup_type_profile')) {
      const button = this._popup.querySelector('.popup__button');
      this._createFormValidator(this._popup.querySelector('.popup__form')).setSubmitButtonState(button, false);
    }
  }

  _setEventListener() {
    this._popup.querySelector('.popup__close').addEventListener('click', () => {
      this.close();
      const form = this._popup.querySelector('.popup__form');
      const formValidator = this._createFormValidator(form);
      [...form.elements].forEach(input => formValidator.resetError(input));

      if (!this._popup.classList.contains('popup_type_profile')) {
        form.reset();
      } else {
        form.elements.userName.value = document.querySelector('.user-info__name').textContent;
        form.elements.userJob.value = document.querySelector('.user-info__job').textContent;
        const button = this._popup.querySelector('.popup__button');
        formValidator.setSubmitButtonState(button, true);
      } 
    });
  }
}