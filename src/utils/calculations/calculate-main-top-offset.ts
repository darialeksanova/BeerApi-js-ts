import { getMainElement } from "../element-getters/get-main-element";
import { getRecentSearchesElement } from "../element-getters/get-recent-searches-element";
import { getSearchElement } from "../element-getters/get-search-element";

export function calculateMainTopOffset(): number {
  const mainElement: HTMLElement = getMainElement();
  const searchElement: HTMLElement = getSearchElement();
  const recentSearchesElement: HTMLElement = getRecentSearchesElement();

  const mainPaddingTop: number = parseFloat(getComputedStyle(mainElement).paddingTop);
  const searchHeight: number = parseFloat(getComputedStyle(searchElement).height);
  const searchMarginBottom: number = parseFloat(getComputedStyle(searchElement).marginBottom);
  const recentSearchesHeight: number = parseFloat(getComputedStyle(recentSearchesElement).height);
  return mainPaddingTop + searchHeight + searchMarginBottom + recentSearchesHeight;
}