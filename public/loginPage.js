"use strict";

const UserFormLogin = new UserForm();
UserFormLogin.loginFormCallback = function ({ login, password }) {
  ApiConnector.login({ login, password }, (response) => {
    console.log(response);
    if (response.success === true) {
      location.reload();
    } else {
      UserFormLogin.setLoginErrorMessage(response.error);
    }
  });
};

UserFormLogin.registerFormCallback = function ({ login, password }) {
  ApiConnector.register({ login, password }, (response) => {
    if (response.success === false) {
      UserFormLogin.setRegisterErrorMessage(response.error);
    } else {
      location.reload();
    }
  });
};
