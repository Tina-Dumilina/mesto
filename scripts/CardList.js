class CardList {
  constructor(container, api) {
    this._container = container;
    this.api = api;
  }

  addCard(card) {
    this._container.appendChild(card);
  }

  render(createCard, createPopupImage) {
    this.api.getInitialCards()
      .then(cards => cards.forEach(card => this.addCard(createCard(card, createPopupImage, this.api))))
      .catch(err => alert(err));
  }
}