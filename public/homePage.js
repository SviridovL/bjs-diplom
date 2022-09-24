const logOut = new LogoutButton();
logOut.action = function () {
  ApiConnector.logout((response) => {
    console.log(response);
    if (response.success === true) {
      location.reload();
    } else {
      alert(`Пользователь не авторизован`);
    }
  });
};
ApiConnector.current((response) => {
  console.log(response);
  if (response.success === true) {
    ProfileWidget.showProfile(response.data);
  }
});
