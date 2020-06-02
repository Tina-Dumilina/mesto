class Card {
  static _template = document.querySelector('#place-card').content;

  constructor(card, createPopupImage) {
    this._card = card;
    this._createPopupImage = createPopupImage;
  }

  create() {
    this._view = Card._template.cloneNode(true).firstElementChild;
    this._view.querySelector('.place-card__name').textContent = this._card.name;
    this._view.querySelector('.place-card__image').style.backgroundImage = `url(${this._card.link})`;

    this._setEventListeners();

    return this._view;
  }

  _setEventListeners() {
    this._view.querySelector('.place-card__like-icon').addEventListener('click', this._like);

    this._view.querySelector('.place-card__image')
    .addEventListener('click', this._showPopupImage);

    this._view.querySelector('.place-card__delete-icon')
    .addEventListener('click', this._remove);
  }

  _like() {
    this.classList.toggle('place-card__like-icon_liked');
  }

  _remove = (event) => {
    event.stopPropagation();
    this._view.remove();
  }

  _showPopupImage = () => {
    this._createPopupImage(document.querySelector('.popup_type_image'), this._card.link);
  }
}