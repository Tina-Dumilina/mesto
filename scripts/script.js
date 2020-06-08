//DOM-элементы
const addPlaceButton = document.querySelector('.user-info__button_add');
const editProfileButton = document.querySelector('.user-info__button_edit');
const userPhotoElement = document.querySelector('.user-info__photo');
const formAddPlace = document.forms.place;
const formEditProfile = document.forms.profile;
const formChangeAvatar = document.forms.avatar;

//Функции-хэлперы
const createCard = (...arg) => new Card(...arg).create();
const createPopupImage = (...arg) => new PopupImage(...arg).open();
const createFormValidator = (...arg) => new FormValidator(...arg);

//Инстансы
const api = new Api({
  baseUrl: 'https://praktikum.tk/cohort11',
  headers: {
    authorization: 'e16df6eb-48db-4658-b78e-44a0f91e14de',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo();
userInfo.setUserInfo(api.setUserInfo());

const addPlacePopup = new PopupForm(document.querySelector('.popup_type_place'), createFormValidator);

const editProfilePopup = new PopupForm(document.querySelector('.popup_type_profile'), createFormValidator);

const changeAvatarPopup = new PopupForm(document.querySelector('.popup_type_avatar'), createFormValidator);

const cardList = new CardList(document.querySelector('.places-list'), api);
cardList.render(createCard, createPopupImage);

const addPlaceFormValidator = new FormValidator(formAddPlace);
const editProfileFormValidator = new FormValidator(formEditProfile);
const changeAvatarFormValidator = new FormValidator(formChangeAvatar);

//Добавление карточки
formAddPlace.addEventListener('submit', (event) => {
  event.preventDefault();
  const isValid = addPlaceFormValidator.isFormValid();
  const popupButton = document.querySelector('.popup__button_add-place');
  popupButton.textContent = 'Загрузка...';
  popupButton.style.fontSize = '18px';

  if (isValid) {
    const card = {
      name: formAddPlace.elements.name.value,
      link: formAddPlace.elements.link.value
    };

    api.addCard(card)
      .then(card => new Card(card, createPopupImage, api))
      .then(cardInstance => {
        cardList.addCard(cardInstance.create());
        formAddPlace.reset();
      })
      .catch(err => alert(err))
      .finally (() => {
        addPlacePopup.close();
        popupButton.textContent = '+';
        popupButton.style.fontSize = '36px';
      });
  }
});

//Редактирование профиля
formEditProfile.addEventListener('submit', (event) => {
  event.preventDefault();
  const isValid = editProfileFormValidator.isFormValid();
  const popupButton = document.querySelector('.popup__button_edit-profile');
  popupButton.textContent = 'Загрузка...';

  if (isValid) {
    userInfo.updateUserInfo(api.updateUserInfo(formEditProfile.elements))
      .then(res => editProfilePopup.close())
      .catch(err => alert(err))
      .finally (() => popupButton.textContent = 'Сохранить');
    }
});

//Редактирование аватара
formChangeAvatar.addEventListener('submit', (event) => {
  event.preventDefault();
  const isValid = changeAvatarFormValidator.isFormValid();

  if (isValid) {
    userInfo.updateUserAvatar(api.updateUserAvatar(formChangeAvatar.elements))
      .then(res => {
        changeAvatarPopup.close();
        formChangeAvatar.reset();
      })
      .catch(err => alert(err));
  }
})

//Слушатели событий
addPlaceButton.addEventListener('click', () => addPlacePopup.open());
editProfileButton.addEventListener('click', () => editProfilePopup.open());
userPhotoElement.addEventListener('click', () => changeAvatarPopup.open());

formAddPlace.addEventListener('input', (e) => addPlaceFormValidator.setEventListeners(e));
formEditProfile.addEventListener('input', (e) => editProfileFormValidator.setEventListeners(e));
formChangeAvatar.addEventListener('input', (e) => changeAvatarFormValidator.setEventListeners(e));