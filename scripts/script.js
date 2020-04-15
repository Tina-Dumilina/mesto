const showPopupButton = document.querySelector('.user-info__button');

const closePopupButton = document.querySelector('.popup__close');
const addButton = document.querySelector('.popup__button');
const form = document.forms.new;
const cardsContainer = document.querySelector('.places-list');

function showInitialCards() {
  initialCards.forEach(obj => cardsContainer.insertAdjacentHTML('beforeend', getTemplate(obj)));
}

function togglePopup() {
  const popup = document.querySelector('.popup');
  popup.classList.toggle('popup_is-opened');
}

function getTemplate(data) {
  const template = `
    <div class="place-card"> 
      <div class="place-card__image" style="background: url(${data.link})"> 
        <button class="place-card__delete-icon"></button>
      </div>
      <div class="place-card__description">
        <h3 class="place-card__name">${data.name}</h3>
        <button class="place-card__like-icon"></button>
      </div>
    </div>
  `;

  return template;
}

function addCard(event) {
  event.preventDefault();

  const card = {
    name: form.elements.name.value,
    link: form.elements.link.value
  }

  if (card.name)

    cardsContainer.insertAdjacentHTML('beforeend', getTemplate(card));

  form.reset();
  togglePopup();
}

function interactWithCard(e) {
  let target = e.target;

  if (target.classList.contains('place-card__delete-icon')) {
    let currentCard = target.closest('.place-card');
    currentCard.remove();
  }

  if (target.classList.contains('place-card__like-icon')) {
    target.classList.toggle('place-card__like-icon_liked');
  }
}

window.onload = showInitialCards;

form.addEventListener('submit', addCard);

cardsContainer.addEventListener('click', interactWithCard);

showPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);