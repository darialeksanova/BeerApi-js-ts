export function getSearchInputElement(): HTMLInputElement {
  const searchInputElement = document.querySelector<HTMLInputElement>('.search__input');
  
  if (!searchInputElement) {
    throw new Error('Search input element not found!');
  } 

  return searchInputElement;
}