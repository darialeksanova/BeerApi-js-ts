import { getFavouritesButtonElement } from "../element-getters/get-favourites-button-element";

export function enableFavouritesButton(): void {
  const favouritesButtonElement: HTMLButtonElement = getFavouritesButtonElement();
  
  favouritesButtonElement.classList.remove('disabled');
}