export function getSearchButtonElement(): HTMLButtonElement {
  const searchButtonElement = document.querySelector<HTMLButtonElement>('.search__button');
  
  if (!searchButtonElement) {
    throw new Error('Search button element not found!');
  } 

  return searchButtonElement;
}