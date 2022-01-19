import { BeerCardElement } from "../../components/beer-card/beer-card";
import { BEER_API_URL } from "../../constants/beer-api-url";
import { Beer } from "../../types/beer";
import { getLoadMoreButtonElement } from "../element-getters/get-load-more-button-element";
import { getToTheTopButtonElement } from "../element-getters/get-to-the-top-button-element";
import { handleLoadMoreButtonClick } from "../load-more-service/handle-load-more-button-click";
import { hideLoadMoreButton } from "../load-more-service/hide-load-more-button";
import { showLoadMoreButton } from "../load-more-service/show-load-more-button";
import { handleNavigateToTheTopButtonClick } from "../navigation-service/handle-navigate-to-the-top-button-click";
import { showNavigateToTheTopArrow } from "../navigation-service/show-navigate-to-the-top-arrow";
import { addSearchValueToRecentSearches } from "./add-search-value-to-recent-searches";
import { checkIfIsFavourite } from "./check-if-is-favourite";
import { displaySearchResults } from "./display-search-results";

export function searchBeer(searchInputValue: string): void {
  fetch(`${BEER_API_URL}/beers`)
    .then((response): Promise<Beer[]> => {
      if (response.ok) {
        return response.json();
      } 
      throw new Error('Error on beers search!');
    })
    .then((beers: Beer[]): void => {
      const searchResults: HTMLLIElement[] = [];
      beers.forEach((beer: Beer) => {
        if (beer.name.toLowerCase().includes(searchInputValue.toLowerCase()) 
          || beer.description.toLowerCase().includes(searchInputValue.toLowerCase())) {
            searchResults.push(new BeerCardElement(beer, { isFavourite: checkIfIsFavourite(beer) }).element);
        }
      });

      if (searchResults.length) {
        addSearchValueToRecentSearches(searchInputValue);
        showLoadMoreButton();
        showNavigateToTheTopArrow();

        const loadMoreButtonElement: HTMLButtonElement = getLoadMoreButtonElement();
        const toTheTopButtonElement: HTMLButtonElement = getToTheTopButtonElement();
      
        loadMoreButtonElement.addEventListener('click', () => handleLoadMoreButtonClick(searchResults));
        toTheTopButtonElement.addEventListener('click', handleNavigateToTheTopButtonClick);
      } else {
        hideLoadMoreButton();
      }

      displaySearchResults(searchResults);
    })
    .catch(error => console.error('Error on beers search!', error));
}