import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

var debounce = require('lodash.debounce');

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

const DEBOUNCE_DELAY = 300;


// Додаємо прослуховування інпуту
searchInput.addEventListener("input", debounce(handleInput, DEBOUNCE_DELAY));

    
function handleInput(event) {
    
    const countryName = event.target.value.trim()
    
  // Очищаем список и информацию о стране при очисте инпута
  if (countryName === "") { countryList.innerHTML = ""; countryInfo.innerHTML = ""; }
  else {
    fetchCountries(countryName)
    .then((countries) => renderCountries(countries))
    .catch((error) => { console.log(error); Notify.failure('Oops, there is no country with that name');});
  }
};

function renderCountries(countries) {
    let markup;

console.log(countries)

if (countries.length > 10) Notify.info('Too many matches found. Please enter a more specific name.');

    
else if (countries.length > 1) {
    markup = countries
        .map(({ name, flags }) => {
            return `<li class="list-item"><img class="country-flag" src=${flags.svg} alt="Сountry flag"><b class="country-name">${name.common}</b></li>`;
    })
        .join("");
    countryList.innerHTML = markup;
}
    
else {
    markup = countries
        .map(({ name, flags, capital, population, languages }) => {
            return `
          <div class="title-box"><img class="country-flag" src=${flags.svg} alt="Сountry flag"><h2 class="country-title">${name.official}</h2></div>
          <p><b>Capital</b>: ${capital}</p>
          <p><b>Population</b>: ${population}</p>
          <p><b>Languages</b>: ${Object.values(languages).join(", ")}</p>
        `;
        });
  countryInfo.innerHTML = markup;
}
}