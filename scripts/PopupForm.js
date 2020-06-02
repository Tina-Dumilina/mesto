class PopupForm extends Popup {
  constructor(popup, createUserProfile, createFormValidator) {
    super(popup);
    this._createUserProfile = createUserProfile;
    this._createFormValidator = createFormValidator;
  }

  open() {
    super.open();

    if (this._popup.classList.contains('popup_type_place')) {
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

      if (this._popup.classList.contains('popup_type_place')) {
        form.reset();
      } else {
        this._createUserProfile().updateUserInfo();
        const button = this._popup.querySelector('.popup__button');
        formValidator.setSubmitButtonState(button, true);
      }
    });
  }
}