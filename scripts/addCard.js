function getTemplate(data) {
  const template = `
  <div class="place-card"> 
    <div style="background-image: url(${data.link})" class="place-card__image">
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