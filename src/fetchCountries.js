export function fetchCountries(countryName) {
    
    // Рядок з параметрами запиту на сервер
    const params = "name,capital,population,flags,languages";



  return fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=${params}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}


