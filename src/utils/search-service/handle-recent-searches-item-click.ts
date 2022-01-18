import { getSearchInputElement } from "../element-getters/get-search-input-element";
import { searchBeer } from "./seerch-beer";

export function handleRecentSearchesItemClick(event: MouseEvent): void {
  const recentSearchesItemElement = event.target as HTMLParagraphElement;
  let searchValue = recentSearchesItemElement.textContent || '';

  const searchInputElement = getSearchInputElement();
    searchInputElement.value = searchValue;
    searchBeer(searchValue);
}