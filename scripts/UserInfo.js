class UserInfo {
  static _usernameElem = document.querySelector('.user-info__name');
  static _userJobElem = document.querySelector('.user-info__job');
  static _userName = document.querySelector('.popup__input_type_user-name');
  static _userJob = document.querySelector('.popup__input_user-job');

  setUserInfo() {
    UserInfo._usernameElem.textContent = UserInfo._userName.value;
    UserInfo._userJobElem.textContent = UserInfo._userJob.value;
  }

  updateUserInfo() {
    UserInfo._userName.value = UserInfo._usernameElem.textContent;
    UserInfo._userJob.value = UserInfo._userJobElem.textContent;
  }
}