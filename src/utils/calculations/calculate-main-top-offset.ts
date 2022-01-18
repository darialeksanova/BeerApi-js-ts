import { getRecentSearchesElement } from "../element-getters/get-recent-searches-element";
import { getSearchElement } from "../element-getters/get-search-element";

export function calculateMainTopOffset(): number {
  const searchElement = getSearchElement();
  const recentSearchesElement = getRecentSearchesElement();

  const searchHeight = parseFloat(getComputedStyle(searchElement).height);
  const searchMarginBottom = parseFloat(getComputedStyle(searchElement).marginBottom);
  const recentSearchesHeight = parseFloat(getComputedStyle(recentSearchesElement).height);
  return searchHeight + searchMarginBottom + recentSearchesHeight;
}