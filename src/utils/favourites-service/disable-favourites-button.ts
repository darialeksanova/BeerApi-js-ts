import { getFavouritesButtonElement } from "../element-getters/get-favourites-button-element";

export function disableFavouritesButton(): void {
  const favouritesButtonElement: HTMLButtonElement = getFavouritesButtonElement();
  
  favouritesButtonElement.classList.add('disabled');
}