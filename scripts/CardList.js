class CardList {
  constructor(container) {
    this._container = container;
  }

  addCard(card) {
    this._container.appendChild(card);
  }

  render(cards, createCard, createPopupImage) {
    cards.forEach(card => {
      this.addCard(createCard(card, createPopupImage));
    });
  }
}