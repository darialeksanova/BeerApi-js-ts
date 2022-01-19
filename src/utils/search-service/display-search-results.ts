import { calculateMainTopOffset } from "../calculations/calculate-main-top-offset";
import { getMainElement } from "../element-getters/get-main-element";
import { getResultsListElement } from "../element-getters/get-results-list-element";

export function displaySearchResults(searchResults: HTMLLIElement[]): void {
  const resultsListElement: HTMLUListElement = getResultsListElement();
  const mainElement = getMainElement();
  resultsListElement.innerHTML = '';

  if (searchResults.length) {
    searchResults.forEach((beerElement, index) => {
      if (index < 5) {
        resultsListElement.append(beerElement);
      }
    });
  } else {
    const errorElement: HTMLHeadingElement = document.createElement('h2');
    errorElement.textContent = 'There were no properties found for the given location.';
    resultsListElement.append(errorElement);
  }

  mainElement.scrollTo({
    top: calculateMainTopOffset(),
    left: 0,
    behavior: 'smooth'
  });
}