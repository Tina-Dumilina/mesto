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

  popup.querySelector('.popup__close').addEventListener('click', () => popup.classList.remove('popup_is-opened'));
}

function controlSingleCard(e) {
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

  togglePopup('.popup_type_profile');
}

addPlaceButton.addEventListener('click', () => togglePopup('.popup_type_place'));
addPlaceForm.addEventListener('submit', addCard);

cardsContainer.addEventListener('click', controlSingleCard);
cardsContainer.addEventListener('click', showImagePopup);

editProfileButton.addEventListener('click', () => togglePopup('.popup_type_profile'));
editProfileForm.addEventListener('submit', editProfile);