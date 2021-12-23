import './styles.css';
import countryTpl from './card.hbs';
import listTpl from './list.hbs';
import API from './fetchCountries';
import debounce from 'lodash.debounce';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

const refs = {
  container: document.querySelector('.js-container'),
  searchForm: document.querySelector('.js-search'),
};

refs.searchForm.addEventListener('input', debounce(searchCountry, 500));

function searchCountry(e) {
  const searchQuery = e.target.value;

  API.fetchCountries(searchQuery)
    .then(renderCard)
    .catch(error => console.log(error));
}

function renderCard(countryArr) {
  if (!countryArr) {
    refs.container.innerHTML = '';
    return;
  }
  if (countryArr.length > 10 || countryArr.status === 404) {
    refs.container.innerHTML = '';
    onFetchError();
    return;
  }
  if (countryArr.length >= 2 && countryArr.length <= 10) {
    const murkupList = listTpl(countryArr);
    refs.container.innerHTML = murkupList;
    return;
  }
  const murkupCard = countryTpl(countryArr);
  refs.container.innerHTML = murkupCard;
}

function onFetchError() {
  error({
    text: 'Введите более точное название страны',
    delay: '2000',
    maxTextHeight: null,
  });
}
