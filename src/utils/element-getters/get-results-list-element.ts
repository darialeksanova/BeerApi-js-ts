export function getResultsListElement(): HTMLUListElement {
  const resultsListElement: HTMLUListElement | null = document.querySelector<HTMLUListElement>('.results');
  
  if (!resultsListElement) {
    throw new Error('Results list element not found!');
  } 

  return resultsListElement;
}