"use strict";

const UserFormLogin = new UserForm();
UserFormLogin.loginFormCallback = function ({ login, password }) {
  ApiConnector.login({ login, password }, (response) => {
    console.log(response);
    if (response.success === true) {
      location.reload();
    } else {
      UserFormLogin.setLoginErrorMessage(
        `Пользователь c логином ${login}  и указанным паролем не найден`
      );
    }
  });
};

UserFormLogin.registerFormCallback = function ({ login, password }) {
  ApiConnector.register({ login, password }, (response) => {
    if (response.success === false) {
      UserFormLogin.setRegisterErrorMessage(
        `Поле \"Логин\" обязательно для заполнения. `
      );
    } else {
      location.reload();
    }
  });
};

