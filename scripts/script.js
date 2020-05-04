const addPlaceButton = document.querySelector('.user-info__button_add');
const addPlaceForm = document.forms.place;

const cardsContainer = document.querySelector('.places-list');

const editProfileButton = document.querySelector('.user-info__button_edit');
const editProfileForm = document.forms.profile;

(function() {
  initialCards.forEach(obj => cardsContainer.insertAdjacentHTML('beforeend', getTemplate(obj)));
})();

(function() {
  const {userName, userJob} = editProfileForm.elements;
  userName.value = document.querySelector('.user-info__name').textContent;
  userJob.value = document.querySelector('.user-info__job').textContent;
})();

function togglePopup(selector) {
  const popup = document.querySelector(selector);
  popup.classList.toggle('popup_is-opened');

  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => popup.classList.toggle('popup_is-opened'));
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

  const {name, link} = addPlaceForm.elements;
  const card = {
    name: name.value,
    link: link.value
  };

  cardsContainer.insertAdjacentHTML('beforeend', getTemplate(card));

  addPlaceForm.reset();
  togglePopup('.popup_add-place');
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

function editProfile(event) {
  event.preventDefault();

  const {userName, userJob} = editProfileForm.elements;

  document.querySelector('.user-info__name').textContent = userName.value;
  document.querySelector('.user-info__job').textContent = userJob.value;

  togglePopup('.popup_edit-profile');
}

addPlaceButton.addEventListener('click', () => togglePopup('.popup_add-place'));
addPlaceForm.addEventListener('submit', addCard);

cardsContainer.addEventListener('click', interactWithCard);

editProfileButton.addEventListener('click', () => togglePopup('.popup_edit-profile'));
editProfileForm.addEventListener('submit', editProfile);