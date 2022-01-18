export function getSearchElement(): HTMLElement {
  const searchElement: HTMLElement | null = document.querySelector<HTMLElement>('.search');
  
  if (!searchElement) {
    throw new Error('Search element not found!');
  }

  return searchElement;
}