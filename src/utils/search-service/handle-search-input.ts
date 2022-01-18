import { KeyboardKey } from "../../constants/keyboard-key";
import { getSearchButtonElement } from "../element-getters/get-search-button-element";
import { searchBeer } from "./seerch-beer";

export function handleSearchInput(event: KeyboardEvent): void {
  const searchButtonElement = getSearchButtonElement();
  const searchInput = event.target as HTMLInputElement;

  if (searchInput.value) {
    searchButtonElement.classList.remove('disabled');

    if (event.key === KeyboardKey.ENTER) {
      searchBeer(searchInput.value);
    }
  } else {
    searchButtonElement.classList.add('disabled');
  }
}