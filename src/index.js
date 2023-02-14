import './css/styles.css';
import { fetchCountries } from './fetchCountries';
var debounce = require('lodash.debounce');

const searchInput = document.querySelector('#search-box');

const DEBOUNCE_DELAY = 300;

console.log("test")

// Додаємо прослуховування інпуту
searchInput.addEventListener("input", debounce(searchCountries, DEBOUNCE_DELAY));

    
function searchCountries () {
  fetchCountries()
    .then((countries) => renderCountries(countries))
    .catch((error) => console.log(error));
};
