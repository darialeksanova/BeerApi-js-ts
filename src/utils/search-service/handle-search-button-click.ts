import { getSearchInputElement } from "../element-getters/get-search-input-element";
import { searchBeer } from "./seerch-beer";

export function handleSearchButtonClick(): void {
  const searchInputElementValue = getSearchInputElement().value;
  searchBeer(searchInputElementValue);
}