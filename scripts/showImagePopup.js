function showImagePopup(e) {
  let target = e.target;

  if (target.classList.contains('place-card__image')) {
    const imageStyleAttr = target.getAttribute('style');
    const imageLink = imageStyleAttr.split('(')[1].split(')')[0];
    const popup = document.querySelector('.image-popup');
    
    popup.classList.add('popup_is-opened');
    popup.querySelector('.image-popup__image').setAttribute('src', imageLink);

    const closeBtn = popup.querySelector('.popup__close');
    closeBtn.addEventListener('click', () => popup.classList.remove('popup_is-opened'));
  }
}