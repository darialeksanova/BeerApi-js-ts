import { RecentSearchesItem } from "../../components/recent-searches-item/recent-searches-item";
import { getRecentSearchesElement } from "../element-getters/get-recent-searches-element";
import { handleRecentSearchesItemClick } from "./handle-recent-searches-item-click";

export function addSearchValueToRecentSearches(searchInputValue: string): void {
  const recentSearchesElement = getRecentSearchesElement();
  const recentSearchValues: string[] = [];

  recentSearchesElement
    .querySelectorAll('.resent-searches-item__text')
    .forEach(recentSearchesItem => recentSearchValues.push(recentSearchesItem.textContent || ''));

    if (!recentSearchValues.includes(searchInputValue)) {
      const recentSearchesItemElement = new RecentSearchesItem(searchInputValue).element;
      recentSearchesElement.append(recentSearchesItemElement);
      recentSearchesItemElement.addEventListener('click', handleRecentSearchesItemClick);
    } else {
      return;
    }
}