import { BEER_API_URL } from "./constants/beer-http";
import '../styles';
import { Beer } from "./types/beer";
import { BeerCardElement } from "./components/beer-card/beer-card";
import { RecentSearchesItem } from "./components/recent-searches-item/recent-searches-item";

function main() {
  const searchInputElement = document.querySelector('.search__input');
  const searchButtonElement = document.querySelector('.search__button');

  if (!(searchInputElement instanceof HTMLInputElement)) {
    throw new Error('HTMLInputElement expected.');
  }

  searchInputElement.addEventListener('keyup', handleSearchInput);

  if (!(searchButtonElement instanceof HTMLButtonElement)) {
    throw new Error('HTMButtonElement expected.');
  }

  searchButtonElement.addEventListener('click', handleSearchButtonClick);
}
main();

function handleSearchInput(event: KeyboardEvent): void {
  const searchButtonElement = document.querySelector('.search__button');

  if (!(event.target instanceof HTMLInputElement)) {
    throw new Error('HTMLInputElement expected.');
  }

  if (event.target.value !== '') {
    searchButtonElement?.classList.remove('disabled');

    if (event.key === 'Enter') {
      searchBeer(event.target.value);
    }
  } else {
    searchButtonElement?.classList.add('disabled');
  }
}

function handleSearchButtonClick(): void {
  const searchInputElement = document.querySelector('.search__input');
  const searchButtonElement = document.querySelector('.search__button');

  if (!(searchInputElement instanceof HTMLInputElement)) {
    throw new Error('HTMLInputElement expected.');
  }

  const searchInputElementValue = searchInputElement.value;
  
  if (searchInputElementValue !== '') {
    searchButtonElement?.classList.remove('disabled');
    searchBeer(searchInputElementValue);
  }
}

function searchBeer(searchInputValue: string): void {
  fetch(`${BEER_API_URL}/beers`)
    .then((response): Promise<Array<Beer>> => {
      if (response.ok) {
        return response.json();
      } 
      throw new Error('Error on beers search!');
    })
    .then((beers: Array<Beer>): void => {
      const resultsListElement = document.querySelector('.results');
      const searchResults: Array<HTMLLIElement> = [];
      beers.forEach(beer => {
        if (beer.name.toLowerCase().includes(searchInputValue.toLowerCase()) 
          || beer.description.toLowerCase().includes(searchInputValue.toLowerCase())) {
          searchResults.push(new BeerCardElement(beer).element);
        }
      });

      if (resultsListElement instanceof HTMLUListElement) {
        resultsListElement.innerHTML = '';
        if (searchResults.length > 0) {
          searchResults.forEach(beer => resultsListElement.append(beer));
          addsearchInputValueToRecentSearches(searchInputValue);
          window.scrollBy(0, 120);
        } else {
          const errorElement = document.createElement('h2');
          errorElement.textContent = 'There were no properties found for the given location.';
          resultsListElement.append(errorElement);
        }
      }
    })
    .catch(error => console.error('Error on beers search!', error));
}

function addsearchInputValueToRecentSearches(searchInputValue: string): void {
  const recentSearchesElement = document.querySelector('.recent-searches');
  const recentSearchValues: Array<string> = [];

  if (recentSearchesElement) {
    recentSearchesElement
      .querySelectorAll('.resent-searches-item__text')
      .forEach(recentSearchesItem => recentSearchValues.push(recentSearchesItem.textContent || ''));

      if (!recentSearchValues.includes(searchInputValue)) {
        const recentSearchesItemElement = new RecentSearchesItem(searchInputValue).element;
        recentSearchesElement?.append(recentSearchesItemElement);
        recentSearchesItemElement.addEventListener('click', handleRecentSearchesItemClick);
      } else {
        return;
      }
  }
}

function handleRecentSearchesItemClick(event: MouseEvent): void {
  const eventTarget = event.target as HTMLParagraphElement;
  let searchValue = eventTarget.textContent || '';
  const searchInputElement = document.querySelector('.search__input');
  if (searchInputElement instanceof HTMLInputElement) {
    searchInputElement.value = searchValue;
    searchBeer(searchValue);
  }
}