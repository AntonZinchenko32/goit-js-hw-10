export function fetchCountries(name) {
    
    // Рядок з параметрами запиту на сервер
    const params = "name.official,capital,population,flags.svg,languages";

  return fetch(`https://restcountries.com/v2/all?fields=${params}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}


