import { getResultsListElement } from "../element-getters/get-results-list-element";

export function showNoMoreResultsErrorMessage(): void {
  const resultsListElement: HTMLUListElement = getResultsListElement();
  const noMoreResultsErrorMessageElement: HTMLParagraphElement = document.createElement('p');

  noMoreResultsErrorMessageElement.textContent = 'No more results found :(';
  resultsListElement.append(noMoreResultsErrorMessageElement);
}