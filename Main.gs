/**
 * Returns the price of a cryptocoin.
 *
 * @param {String} coin Coingecko's ID or the name of the coin you want the price of (e.g. Bitcoin; BTC)
 * @param {String} currency The name of the currency you want the price on (e.g. USD)
 * @return Returns the price of a coin in a fiat.
 * @customfunction
 */
function CRYPTOPRICE(coin, currency) {
  // Coingecko expects paramethers to be in lowercase. This handles that.
  coin = coin.toLowerCase();
  currency = currency.toLowerCase();
  
  // If the currency given by the user is not supported by coingecko, returns a error.
  let isCurrencyValid = checkCurrency(currency);
  if (isCurrencyValid === false) {
    return "currency is invalid";
  }
  
  // If the coin given by the user is not supported by coingecko, returns a error.
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
    // iterate through all of the supported coins and try to find the coin input as an id
    if (listJsonData[i].id === coinInput) {
      return coinInput;
    // or a symbol
    } else if (listJsonData[i].symbol === coinInput) {
      return listJsonData[i].id;
    }
  }
  
  return false; // if it can't find a match
}


// check if the input currency is in the list of supported conversion currencies of coingecko
function checkCurrency(currencyInput) {
  let currenciesListQuery = 'https://api.coingecko.com/api/v3/simple/supported_vs_currencies'
  let response = UrlFetchApp.fetch(currenciesListQuery, {'muteHttpExceptions': true});
  var listJsonText = response.getContentText();
  var listJsonData = JSON.parse(listJsonText);
  
  return listJsonData.includes(currencyInput);
}