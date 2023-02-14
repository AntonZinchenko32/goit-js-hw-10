import './css/styles.css';
import { fetchCountries } from './fetchCountries';
var debounce = require('lodash.debounce');

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector(".country-list");

const DEBOUNCE_DELAY = 300;


// Додаємо прослуховування інпуту
searchInput.addEventListener("input", debounce(searchCountries, DEBOUNCE_DELAY));

    
function searchCountries(event) {
    
const countryName = event.target.value.trim()

  fetchCountries(countryName)
    .then((countries) => renderCountries(countries))
    .catch((error) => console.log(error));
};

function renderCountries(countries) {
    
if (countries.length > 10) console.log("Too many matches found. Please enter a more specific name.");

else if (countries.length > 1) {
    const markup = countries
        .map(({ name, flags }) => {
            return `<li><img src=${flags.svg} alt="Сountry flag" width="40"><h2>${name.official}</h2></li>`;
    })
        .join("");
    console.log(markup)
    countryList.innerHTML = markup;
}
}