//DOM-элементы
const addPlaceButton = document.querySelector('.user-info__button_add');
const editProfileButton = document.querySelector('.user-info__button_edit');
const formAddPlace = document.forms.place;
const formEditProfile = document.forms.profile;

//Функции-хэлперы
const createCard = (...arg) => new Card(...arg).create();
const createUserProfile = () => new UserInfo();
const createPopupImage = (...arg) => new PopupImage(...arg).open();
const createFormValidator = (...arg) => new FormValidator(...arg);

//Инстансы
const addPlacePopup = new PopupForm(document.querySelector('.popup_type_place'), null, createFormValidator);

const editProfilePopup = new PopupForm(document.querySelector('.popup_type_profile'), createUserProfile, createFormValidator);

const cardList = new CardList(document.querySelector('.places-list'));
cardList.render(initialCards, createCard, createPopupImage);

const userInfo = new UserInfo();
userInfo.updateUserInfo();

const addPlaceFormValidator = new FormValidator(formAddPlace);
const editProfileFormValidator = new FormValidator(formEditProfile);

//Добавление карточки
formAddPlace.addEventListener('submit', (event) => {
  event.preventDefault();
  const isValid = addPlaceFormValidator.isFormValid();

  if (isValid) {
    const card = {
      name: formAddPlace.elements.name.value,
      link: formAddPlace.elements.link.value
    };
    const cardInstance = new Card(card, createPopupImage);
    cardList.addCard(cardInstance.create());
    formAddPlace.reset();
    addPlacePopup.close();
  }
});

//Редактирование профиля
formEditProfile.addEventListener('submit', (event) => {
  event.preventDefault();
  const isValid = editProfileFormValidator.isFormValid();

  if (isValid) {
    userInfo.setUserInfo();
    editProfilePopup.close();
  }
});

//Слушатели событий
addPlaceButton.addEventListener('click', () => addPlacePopup.open());
editProfileButton.addEventListener('click', () => editProfilePopup.open());

formAddPlace.addEventListener('input', (e) => addPlaceFormValidator.setEventListeners(e));
formEditProfile.addEventListener('input', (e) => editProfileFormValidator.setEventListeners(e));