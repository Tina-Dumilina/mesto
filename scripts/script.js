const addPlaceButton = document.querySelector('.user-info__button_add');
const addPlaceForm = document.forms.place;

const cardsContainer = document.querySelector('.places-list');

const editProfileButton = document.querySelector('.user-info__button_edit');

function showInitialCards() {
  initialCards.forEach(obj => cardsContainer.insertAdjacentHTML('beforeend', getTemplate(obj)));
}

function toggleAddPlacePopup() {
  const addPlacePopup = document.querySelector('.popup_add-place');
  addPlacePopup.classList.toggle('popup_is-opened');
}

function toggleEditProfilePopup() {
  const editProfilePopup = document.querySelector('.popup_edit-profile');
  editProfilePopup.classList.toggle('popup_is-opened');
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
    name: addPlaceForm.elements.name.value,
    link: addPlaceForm.elements.link.value
  }

  cardsContainer.insertAdjacentHTML('beforeend', getTemplate(card));

  addPlaceForm.reset();
  toggleAddPlacePopup();
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

addPlaceForm.addEventListener('submit', addCard);

cardsContainer.addEventListener('click', interactWithCard);

addPlaceButton.addEventListener('click', toggleAddPlacePopup);

editProfileButton.addEventListener('click', toggleEditProfilePopup);

closePopupButton.addEventListener('click', toggleEditProfilePopup);