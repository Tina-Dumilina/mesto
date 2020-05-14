const formAddPlace = document.forms.place;
const formEditProfile = document.forms.profile;

const cardsContainer = document.querySelector('.places-list');

const addPlaceButton = document.querySelector('.user-info__button_add');
const editProfileButton = document.querySelector('.user-info__button_edit');

initialCards.forEach(obj => cardsContainer.insertAdjacentHTML('beforeend', getTemplate(obj)));

function fillEditProfileInputs () {
  const {userName, userJob} = formEditProfile.elements;
  userName.value = document.querySelector('.user-info__name').textContent;
  userJob.value = document.querySelector('.user-info__job').textContent;
}

function togglePopup(selector) {
  const popup = document.querySelector(selector);
  popup.classList.toggle('popup_is-opened');

  if (selector === '.popup_type_place') {
    const button = popup.querySelector('.popup__button');
    setSubmitButtonState(button, false);
  }

  popup.querySelector('.popup__close').addEventListener('click', () => {
    popup.classList.remove('popup_is-opened');
    const form = popup.querySelector('.popup__form');
    [...form.elements].forEach(input => resetError(input));

    if (selector === '.popup_type_place') {
      form.reset();
    } else {
      fillEditProfileInputs();
    }
  });
}

function likeAndDeleteCard(e) {
  const target = e.target;
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
  const isValid = isFormValid(formEditProfile);

  if (isValid) {
    const {userName, userJob} = formEditProfile.elements;
    document.querySelector('.user-info__name').textContent = userName.value;
    document.querySelector('.user-info__job').textContent = userJob.value;

    togglePopup('.popup_type_profile');
  }
}

window.onload = fillEditProfileInputs;

addPlaceButton.addEventListener('click', () => togglePopup('.popup_type_place'));
editProfileButton.addEventListener('click', () => togglePopup('.popup_type_profile'));

formEditProfile.addEventListener('submit', editProfile);
formEditProfile.addEventListener('input', setEventListeners);

formAddPlace.addEventListener('submit', addCard);
formAddPlace.addEventListener('input', setEventListeners);

cardsContainer.addEventListener('click', likeAndDeleteCard);
cardsContainer.addEventListener('click', showImagePopup);