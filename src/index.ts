import '../styles';
import { getSearchInputElement } from "./utils/element-getters/get-search-input-element";
import { getSearchButtonElement } from "./utils/element-getters/get-search-button-element";
import { getMainElement } from "./utils/element-getters/get-main-element";
import { handleSearchInput } from "./utils/search-service/handle-search-input";
import { handleSearchButtonClick } from "./utils/search-service/handle-search-button-click";
import { handleMainScroll } from "./utils/navigation-service/handle-main-scroll";
import { getFavouritesButtonElement } from './utils/element-getters/get-favourites-button-element';
import { handleFavouritesButtonClick } from './utils/favourites-service/handle-favourites-button-click';
import { showFavouritesCount } from './utils/favourites-service/show-favourites-count';
import { showRecentSearches } from './utils/search-service/show-recent-searches';

function main(): void {
  const searchInputElement: HTMLInputElement = getSearchInputElement();
  const searchButtonElement: HTMLButtonElement = getSearchButtonElement();
  const mainElement: HTMLElement = getMainElement();
  const favouritesButtonElement: HTMLButtonElement = getFavouritesButtonElement();

  searchInputElement.addEventListener('keyup', handleSearchInput);
  searchButtonElement.addEventListener('click', handleSearchButtonClick);
  mainElement.addEventListener('scroll', handleMainScroll);
  favouritesButtonElement.addEventListener('click', handleFavouritesButtonClick);

  showFavouritesCount();
  showRecentSearches();
}
main();