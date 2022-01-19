import { getLoadMoreButtonElement } from "../element-getters/get-load-more-button-element";

export function hideLoadMoreButton(): void {
  const loadMoreButtonElement: HTMLButtonElement | null = getLoadMoreButtonElement();
  
  loadMoreButtonElement.style.display = 'none';
}