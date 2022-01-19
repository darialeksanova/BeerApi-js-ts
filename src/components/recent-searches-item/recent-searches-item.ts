import { getSearchInputElement } from "../../utils/element-getters/get-search-input-element";
import { searchBeer } from "../../utils/search-service/search-beer";

export class RecentSearchesItem {
  private _element: HTMLLIElement = document.createElement('li');

  constructor(searchInputValue: string) {
    this._element.classList.add('recent-searches-item');
    this._element.innerHTML = `<p class="recent-searches-item__text">${searchInputValue}</p>`;

    this.setRecentSearchesItemClickListener();
  }

  public get element(): HTMLLIElement {
    return this._element;
  }

  private setRecentSearchesItemClickListener(): void {
    this._element.addEventListener('click', this.handleRecentSearchesItemClick.bind(this));
  }

  private handleRecentSearchesItemClick(): void {
    const recentSearchesItemTextElement: HTMLParagraphElement | null = this._element.querySelector<HTMLParagraphElement>('.recent-searches-item__text');

    if (!recentSearchesItemTextElement) {
      throw new Error('Recent searches item text element not found');
    }

    let searchValue: string = recentSearchesItemTextElement.textContent || '';
  
    const searchInputElement: HTMLInputElement = getSearchInputElement();
      searchInputElement.value = searchValue;
      searchBeer(searchValue);
  }
}