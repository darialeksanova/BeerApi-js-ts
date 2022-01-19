import { RecentSearchesItem } from "../../components/recent-searches-item/recent-searches-item";
import { getRecentSearchesElement } from "../element-getters/get-recent-searches-element";

export function addSearchValueToRecentSearches(searchInputValue: string): void {
  const recentSearchesElement: HTMLElement = getRecentSearchesElement();
  const recentSearchValues: string[] = [];

  recentSearchesElement
    .querySelectorAll('.recent-searches-item__text')
    .forEach(recentSearchesItem => recentSearchValues.push(recentSearchesItem.textContent || ''));

    if (!recentSearchValues.includes(searchInputValue)) {
      const recentSearchesItemElement: HTMLLIElement = new RecentSearchesItem(searchInputValue).element;
      
      recentSearchesElement.append(recentSearchesItemElement);
    } else {
      return;
    }

  const recentSearchesFromStorageAsString: string | null = localStorage.getItem('recentSearches');

  if (!recentSearchesFromStorageAsString) {
    localStorage.setItem('recentSearches', JSON.stringify([searchInputValue]));
  } else {
    const recentSearchesFromStorageParsed: string[] = JSON.parse(recentSearchesFromStorageAsString);

    if (!recentSearchesFromStorageParsed.includes(searchInputValue)) {
      localStorage.setItem('recentSearches', JSON.stringify([...recentSearchesFromStorageParsed, searchInputValue]));
    } else {
      return;
    }
  }
}