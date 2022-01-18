export function getLoadMoreButtonElement(): HTMLButtonElement {
  const loadMoreButtonElement: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('.actions__load-more');
  
  if (!loadMoreButtonElement) {
    throw new Error('Load more button element not found!');
  } 

  return loadMoreButtonElement;
}