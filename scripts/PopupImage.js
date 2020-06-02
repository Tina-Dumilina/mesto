class PopupImage extends Popup {
  constructor(popup, link) {
    super(popup);
    this._link = link;
  }

  open() {
    super.open();
    this._popup.querySelector('.image-popup__image').setAttribute('src', this._link);
  }

  _setEventListener() {
    this._popup.querySelector('.popup__close').addEventListener('click', () => {
      super.close();
    });
  }
}