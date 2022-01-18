import { getResultsListElement } from "../element-getters/get-results-list-element";
import { hideLoadMoreButton } from "./hide-load-more-button";

export function handleLoadMoreButtonClick(searchResults: HTMLLIElement[]): void {
  const resultsListElement = getResultsListElement();
  const resultsOnPageCount = resultsListElement.children.length;
  const resultsToShow = searchResults.slice(resultsOnPageCount, resultsOnPageCount + 5);

  if (resultsToShow.length >= 5) {
    resultsToShow.forEach(item => resultsListElement.append(item));
  } else {
    hideLoadMoreButton();
    const noMoreResultsErrorMessageElement = document.createElement('p');
    noMoreResultsErrorMessageElement.textContent = 'No more results found :(';
    resultsListElement.append(noMoreResultsErrorMessageElement);
  }
}