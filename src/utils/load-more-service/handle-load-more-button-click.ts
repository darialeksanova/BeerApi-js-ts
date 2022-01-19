import { getResultsListElement } from "../element-getters/get-results-list-element";
import { hideLoadMoreButton } from "./hide-load-more-button";
import { showNoMoreResultsErrorMessage } from "./show-no-more-results-error-message";

export function handleLoadMoreButtonClick(searchResults: HTMLLIElement[]): void {
  const resultsListElement: HTMLUListElement = getResultsListElement();
  const resultsOnPageCount: number = resultsListElement.children.length;
  const resultsToShow: HTMLLIElement[] = searchResults.slice(resultsOnPageCount, resultsOnPageCount + 5);

  if (resultsToShow.length >= 5) {
    resultsToShow.forEach(beerElement => resultsListElement.append(beerElement));
  } else {
    resultsToShow.forEach(beerElement => resultsListElement.append(beerElement));
    hideLoadMoreButton();
    showNoMoreResultsErrorMessage();
  }
}