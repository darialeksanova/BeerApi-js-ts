import { BEER_API_URL } from "./constants/beer-api-url";
import '../styles';
import { Beer } from "./types/beer";
import { BeerCardElement } from "./components/beer-card/beer-card";
import { RecentSearchesItem } from "./components/recent-searches-item/recent-searches-item";
import { KeyboardKey } from "./constants/keyboard-key";

function main(): void {
  const searchInputElement = document.querySelector<HTMLInputElement>('.search__input');
  const searchButtonElement = document.querySelector<HTMLButtonElement>('.search__button');

  if (!searchInputElement) {
    throw new Error('HTMLInputElement expected.');
  }

  searchInputElement.addEventListener('keyup', handleSearchInput);

  if (!searchButtonElement) {
    throw new Error('HTMButtonElement expected.');
  }

  searchButtonElement.addEventListener('click', handleSearchButtonClick);
}
main();

function handleSearchInput(event: KeyboardEvent): void {
  const searchButtonElement = document.querySelector<HTMLButtonElement>('.search__button');
  const eventTarget = event.target as HTMLInputElement;

  if (!eventTarget) {
    throw new Error('HTMLInputElement expected.');
  }

  if (eventTarget.value !== '') {
    searchButtonElement?.classList.remove('disabled');

    if (event.key === KeyboardKey.ENTER) {
      searchBeer(eventTarget.value);
    }
  } else {
    searchButtonElement?.classList.add('disabled');
  }
}

function handleSearchButtonClick(): void {
  const searchInputElement = document.querySelector<HTMLInputElement>('.search__input');
  const searchButtonElement = document.querySelector<HTMLButtonElement>('.search__button');

  if (!searchInputElement) {
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
    .then((response): Promise<Beer[]> => {
      if (response.ok) {
        return response.json();
      } 
      throw new Error('Error on beers search!');
    })
    .then((beers: Beer[]): void => {
      displaySearchResults(beers, searchInputValue);
      
    })
    .catch(error => console.error('Error on beers search!', error));
}

function displaySearchResults(beers: Beer[], searchInputValue: string) {
  const resultsListElement = document.querySelector<HTMLUListElement>('.results');
  const searchResults: HTMLLIElement[] = [];
  beers.forEach(beer => {
    if (beer.name.toLowerCase().includes(searchInputValue.toLowerCase()) 
      || beer.description.toLowerCase().includes(searchInputValue.toLowerCase())) {
      searchResults.push(new BeerCardElement(beer).element);
    }
  });

  if (resultsListElement) {
    resultsListElement.innerHTML = '';

    if (searchResults.length) {
      searchResults.forEach(beer => resultsListElement.append(beer));
      addsearchInputValueToRecentSearches(searchInputValue);
      window.scrollBy(0, 120);
    } else {
      const errorElement = document.createElement('h2');
      errorElement.textContent = 'There were no properties found for the given location.';
      resultsListElement.append(errorElement);
    }
  }
}

function addsearchInputValueToRecentSearches(searchInputValue: string): void {
  const recentSearchesElement = document.querySelector<HTMLUListElement>('.recent-searches');
  const recentSearchValues: string[] = [];

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