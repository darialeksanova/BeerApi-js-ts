import { RecentSearchesItem } from "../../components/recent-searches-item/recent-searches-item";
import { getRecentSearchesElement } from "../element-getters/get-recent-searches-element";

export function showRecentSearches(): void {
  const recentSearchesFromStorageAsString: string | null = localStorage.getItem('recentSearches');
  const recentSearchesElement = getRecentSearchesElement();

  if (!recentSearchesFromStorageAsString) {
    return;
  }

  const recentSearchesFromStorageAsArray: string[] = Array.from(JSON.parse(recentSearchesFromStorageAsString));
  
  recentSearchesFromStorageAsArray.forEach(searchValue => {
    recentSearchesElement.append(new RecentSearchesItem(searchValue).element);
  });
}