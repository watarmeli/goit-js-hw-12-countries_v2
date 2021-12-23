import { error } from '@pnotify/core';

const BASE_URL = 'https://restcountries.com/v2/';

function fetchCountries(searchQuery) {
  return fetch(`${BASE_URL}/name/${searchQuery}`).then(r => {
    if (!r.ok) {
      error({
        text: 'Введите название страны',
        delay: '2000',
        maxTextHeight: null,
      });
      return;
    }
    return r.json();
  });
}

export default { fetchCountries };
