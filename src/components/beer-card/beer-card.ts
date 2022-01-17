import { Beer } from '../../types/beer';

export class BeerCardElement {
  private _element = document.createElement('li');

  constructor(beer: Beer) {
    this._element.classList.add('card');
    this._element.innerHTML = `
      <div class="card__actions">
        <button class="card__actions-button">
          <img src="../../../assets/icons/heart-solid.svg" alt="favourite">
        </button>
      </div>
      <div class="card__img">
        <img src=${beer.image_url} alt="image not found">
      </div>
      <div class="card__text">
        <h2 class="card__text-title">${beer.name}</h2>
        <p class="card__text-description">${beer.description}</p>
      </div>`;
  }

  public get element() {
    return this._element;
  }
}