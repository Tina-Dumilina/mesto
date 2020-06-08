class Card {
  static _template = document.querySelector('#place-card').content;

  constructor(card, createPopupImage, api) {
    this._card = card;
    this._createPopupImage = createPopupImage;
    this._api = api;
  }

  create() {
    this._view = Card._template.cloneNode(true).firstElementChild;
    this._view.querySelector('.place-card__name').textContent = this._card.name;
    this._view.querySelector('.place-card__image').style.backgroundImage = `url(${this._card.link})`;
    this._view.querySelector('.place-card__counter').textContent = this._card.likes.length;

    const ownerId = document.querySelector('.user-info__name').dataset.id;
    this._card.likes.forEach(person => {
      if (person._id === ownerId) {
        this._view.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked')
      }
    });

    if (this._card.owner._id !== ownerId) {
      this._view.querySelector('.place-card__delete-icon').style.display = "none";
    }

    this._cardId = this._card._id;
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

  _like = () => {
    if (this._view.querySelector('.place-card__like-icon').classList.contains('place-card__like-icon_liked')) {
      this._api.removeLike(this._cardId)
        .then(card => {
          this._view.querySelector('.place-card__counter').textContent = card.likes.length;
          this._view.querySelector('.place-card__like-icon').classList.remove('place-card__like-icon_liked');
        })
        .catch(err => alert(err));
    } else {
      this._api.addLike(this._cardId)
        .then(card => {
          this._view.querySelector('.place-card__counter').textContent = card.likes.length;
          this._view.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
        })
        .catch(err => alert(err));
    }
  }

  _remove = (event) => {
    event.stopPropagation();
    if (confirm('Вы точно хотите удалить карточку?')) {
      this._api.deleteCard(this._cardId)
        .then(res => {
          if (res.ok) {
            this._view.remove();
          } else {
            return Promise.reject(`Ошибка: ${res.status}`);
          }
        })
        .catch(err => alert(err));
    }
  }

  _showPopupImage = () => {
    this._createPopupImage(document.querySelector('.popup_type_image'), this._card.link);
  }
}