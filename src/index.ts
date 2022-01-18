import '../styles';
import { getSearchInputElement } from "./utils/element-getters/get-search-input-element";
import { getSearchButtonElement } from "./utils/element-getters/get-search-button-element";
import { getMainElement } from "./utils/element-getters/get-main-element";
import { handleSearchInput } from "./utils/search-service/handle-search-input";
import { handleSearchButtonClick } from "./utils/search-service/handle-search-button-click";
import { handleMainScroll } from "./utils/navigation-service/handle-main-scroll";

function main(): void {
  const searchInputElement = getSearchInputElement();
  const searchButtonElement = getSearchButtonElement();
  const mainElement = getMainElement();

  searchInputElement.addEventListener('keyup', handleSearchInput);
  searchButtonElement.addEventListener('click', handleSearchButtonClick);
  mainElement.addEventListener('scroll', handleMainScroll);
}
main();