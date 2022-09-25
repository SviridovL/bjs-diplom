const logOut = new LogoutButton();
logOut.action = function () {
  ApiConnector.logout((response) => {
    console.log(response);
    if (response.success === true) {
      location.reload();
    } else {
      alert(response.error);
    }
  });
};
ApiConnector.current((response) => {
  // console.log(response);
  if (response.success === true) {
    ProfileWidget.showProfile(response.data);
  }
});
const UserRatesBoard = new RatesBoard();
function ExchangeRate() {
  ApiConnector.getStocks((response) => {
    //console.log(response);
    if (response.success === true) {
      UserRatesBoard.clearTable(response);
      UserRatesBoard.fillTable(response.data);
    }
  });
}
ExchangeRate();
setInterval(ExchangeRate, 60000);

const UserMoneyManager = new MoneyManager();

UserMoneyManager.addMoneyCallback = function ({ currency, amount }) {
  ApiConnector.addMoney({ currency, amount }, (response) => {
    //console.log(currency, amount);
    console.log(response);
    isSuccess = response.success;
    if (isSuccess === true) {
      message = `Пополнение счета на ${amount} ${currency} успешно`;
      ProfileWidget.showProfile(response.data);
      UserMoneyManager.setMessage(isSuccess, message);
    } else {
      UserMoneyManager.setMessage(isSuccess, response.error);
    }
  });
};

UserMoneyManager.conversionMoneyCallback = function ({
  fromCurrency,
  targetCurrency,
  fromAmount,
}) {
  ApiConnector.convertMoney(
    { fromCurrency, targetCurrency, fromAmount },
    (response) => {
      //console.log(response);
      isSuccess = response.success;
      if (isSuccess === true) {
        message = `Конвертация валюты  ${fromAmount} ${fromCurrency} в ${targetCurrency}  успешно`;
        ProfileWidget.showProfile(response.data);
        UserMoneyManager.setMessage(isSuccess, message);
      } else {
        UserMoneyManager.setMessage(isSuccess, response.error);
      }
    }
  );
};
UserMoneyManager.sendMoneyCallback = function ({ to, currency, amount }) {
  ApiConnector.transferMoney({ to, currency, amount }, (response) => {
    console.log(response); //console.log(response);
    isSuccess = response.success;
    if (isSuccess === true) {
      message = `Конвертация валюты  ${fromAmount} ${fromCurrency} в ${targetCurrency}  успешно`;
      ProfileWidget.showProfile(response.data);
      UserMoneyManager.setMessage(isSuccess, message);
    } else {
      UserMoneyManager.setMessage(isSuccess, response.error);
    }
  }); // => {
  //console.log(response)
};
