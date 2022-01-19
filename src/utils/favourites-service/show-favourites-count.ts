import { Beer } from "../../types/beer";
import { getFavouritesCounterElement } from "../element-getters/get-favourites-counter-element";
import { disableFavouritesButton } from "./disable-favourites-button";
import { enableFavouritesButton } from "./enable-favourites-button";

export function showFavouritesCount(): void {
  const favouriteBeersFromStorageAsString: string | null = localStorage.getItem('favouriteBeers');
  const favouritesCounterElement = getFavouritesCounterElement();

  if (!favouriteBeersFromStorageAsString) {
    favouritesCounterElement.textContent = '0';
    disableFavouritesButton();
  } else {
    const favouriteBeersFromStorageParsed: Beer[] = JSON.parse(favouriteBeersFromStorageAsString);
    
    favouritesCounterElement.textContent = `${favouriteBeersFromStorageParsed.length}`;
    enableFavouritesButton();
  }
}