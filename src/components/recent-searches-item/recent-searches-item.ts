export class RecentSearchesItem {
  private _element = document.createElement('li');

  constructor(searchInputValue: string) {
    this._element.classList.add('resent-searches-item');
    this._element.innerHTML = `<p class="resent-searches-item__text">${searchInputValue}</p>`;
  }

  public get element(): HTMLLIElement {
    return this.element;
  }
}