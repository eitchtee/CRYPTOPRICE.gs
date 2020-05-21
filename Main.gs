/**
 * Returns the price of a cryptocoin.
 *
 * @param {String} coin Coingecko's ID or the name of the coin you want the price of (e.g. Bitcoin; BTC)
 * @param {String} currency The name of the currency you want the price on (e.g. USD)
 * @return Returns the price of a coin in a fiat.
 * @customfunction
 */
function CRYPTOPRICE(coin, currency) {
  coin = coin.toLowerCase();
  currency = currency.toLowerCase();
  
  let isCurrencyValid = checkCurrency(currency);
  if (isCurrencyValid === false) {
    return "currency is invalid";
  }
  
  let coinID = getCoinID(coin)
  if (coinID === false) {
     return "coin is invalid";
  }
  
  let coin_id_query = 'https://api.coingecko.com/api/v3//coins/list'
  let query = 'https://api.coingecko.com/api/v3/simple/price?ids=' + coinID + '&vs_currencies=' + currency

  let response = UrlFetchApp.fetch(query, {'muteHttpExceptions': true});
  var json = response.getContentText();
  var data = JSON.parse(json);
  
  return data[coinID][currency];
}


function getCoinID(coinInput) {
  let coinListQuery = 'https://api.coingecko.com/api/v3/coins/list'
  let response = UrlFetchApp.fetch(coinListQuery, {'muteHttpExceptions': true});
  var listJsonText = response.getContentText();
  var listJsonData = JSON.parse(listJsonText);
  
  for (var i = 0, len = listJsonData.length; i < len; i++) {
    if (listJsonData[i].id === coinInput) {
      return coinInput;
    } else if (listJsonData[i].symbol === coinInput) {
      return listJsonData[i].id;
    }
  }
  
  return false;
}


function checkCurrency(currencyInput) {
  let currenciesListQuery = 'https://api.coingecko.com/api/v3/simple/supported_vs_currencies'
  let response = UrlFetchApp.fetch(currenciesListQuery, {'muteHttpExceptions': true});
  var listJsonText = response.getContentText();
  var listJsonData = JSON.parse(listJsonText);
  return listJsonData.includes(currencyInput);
}