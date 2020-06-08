class UserInfo {
  static _usernameElem = document.querySelector('.user-info__name');
  static _userJobElem = document.querySelector('.user-info__job');
  static _userAvatarElem = document.querySelector('.user-info__photo');
  static _userName = document.querySelector('.popup__input_type_user-name');
  static _userJob = document.querySelector('.popup__input_user-job');

  updateUserInfo(api) {
    return api.then(data => {
      UserInfo._usernameElem.textContent = data.name;
      UserInfo._userJobElem.textContent = data.about;
    }).catch((err) => {
      console.log(err); 
    });
  }

  setUserInfo(api) {
    api.then(data => {
      UserInfo._usernameElem.textContent = UserInfo._userName.value = data.name;
      UserInfo._userJobElem.textContent = UserInfo._userJob.value = data.about;
      UserInfo._userAvatarElem.style.backgroundImage = `url(${data.avatar})`;
      UserInfo._usernameElem.setAttribute('data-id', data._id);
    }).catch((err) => {
      console.log(err); 
    });;
  }

  updateUserAvatar(api) {
    return api.then(profile => {
      UserInfo._userAvatarElem.style.backgroundImage = `url(${profile.avatar})`;
    }).catch((err) => {
      console.log(err); 
    });
  }
}