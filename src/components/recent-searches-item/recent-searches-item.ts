export class RecentSearchesItem {
  #element;

  constructor(searchInputValue: string) {
    this.#element = document.createElement('li');
    this.#element.classList.add('resent-searches-item');
    this.#element.innerHTML = `<p class="resent-searches-item__text">${searchInputValue}</p>`;
  }

  get element() {
    return this.#element;
  }
}