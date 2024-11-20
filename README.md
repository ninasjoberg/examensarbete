# Examensarbete - Näringsberäknaren

Camilla Tranberg & Nina Sjöberg

Nackademin ht 16 - vt18

Add/see chrome extension: https://chrome.google.com/webstore/detail/n%C3%A4ringsber%C3%A4knaren/emhfohfefkhakccjnfpfcmikoeaanhgn

![Screenshot 2024-11-20 at 15 34 41](https://github.com/user-attachments/assets/3671054a-bae7-4d5c-b5b4-5ba7b2ab5019)


see also the repo for processing of data: https://github.com/ninasjoberg/examensarbete_data


## Functionality:

A chorme extension that calculates nutritional values of products in a recipe based on personal data such as age, sex and physical activity. The data is taken from 'Livsmedelsverkets' food databas and from their publication 'Nordiska näringsrekommendationer' (info about nutritional recommendations).

The plugin is for now working at the following webbpages: ica.se, coop.se, koket.se Make sure to visit a recipe to be able to use the plugin.


## Languages and techniques:

- Java Script
- React (create react app)
- GraphCMS, databas and api
- Apollo, GraphQl client
- Chrome extension
- Chrome api
- Chrome storage
- Fuse, searchtool


## Suggestions for future functionality / improvements:

- Add spices and bread to the database (not included today)
- Make search functionality better
- Make sure users who has the plugin gets updates when we make changes to the plugin.


## Development

```npm run build```
- Go to chrome://extensions , press "Load unpacked" and select the 'build' folder for this project
