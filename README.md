# CRYPTOPRICE.gs
Custom function for Google Sheets that returns the price of a cryptocurrency.

---

## Installation

1. Create or open a spreadsheet in Google Sheets.
1. Select the menu item Tools > Script editor. If you are presented with a welcome screen, click Blank Project on the left to start a new project.
1. Delete any code in the script editor.
1. Paste the contents of [cryptoprice.gs](cryptoprice.gs) on the script editor.
1. Select the menu item File > Save. Give the script project a name and click OK.
1. All done! Now you can use CRYPTOPRICE( ) from any cell on your spreadsheet.

> Guide taken from [Google Apps Script Documentation](https://developers.google.com/apps-script/guides/sheets/functions) and modified by me.

## Usage
```CRYPTOPRICE( [coin] ; [currency] )```

- `coin` needs to be either an coin shortname (_e.g. BTC_) or Coingecko's own id naming (_e.g. Bitcoin_). Case Insensitive.

- `currency` needs to be either an currency ISO 4217 name (_e.g. USD for US Dollars_) or a coin shortname (_e.g. BTC_). Case Insensitive.

**Not all coins and currencies are supported, refer to [Coingecko API Documentation](https://www.coingecko.com/pt/api) for the full list.**

---

**Powered by CoinGecko [API](https://www.coingecko.com/pt/api).**
