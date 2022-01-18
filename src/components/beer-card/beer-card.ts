import { Beer } from '../../types/beer';
import { getFavouritesButtonElement } from '../../utils/element-getters/get-favourites-button-element';
import { getfavouritesCounterElement } from '../../utils/element-getters/get-favourites-counter-element';

export class BeerCardElement {
  private _element: HTMLLIElement = document.createElement('li');

  constructor(private beer: Beer) {
    this._element.classList.add('card');
    this._element.innerHTML = `
      <div class="card__actions">
        <button class="card__actions-add-to-favourites-button">Add</button>
      </div>
      <div class="card__img">
        <img src=${beer.image_url} alt="image not found">
      </div>
      <div class="card__text">
        <h2 class="card__text-title">${beer.name}</h2>
        <p class="card__text-description">${beer.description}</p>
      </div>`;

    this.setAddToFavouritesButtonClickListener();
  }

  public get element(): HTMLLIElement {
    return this._element;
  }

  private setAddToFavouritesButtonClickListener(): void {
    const addToFavouritesButton: HTMLButtonElement = this.getAddToFavouritesButton();
    addToFavouritesButton.addEventListener('click', this.addItemToFavourites.bind(this));
  }

  private addItemToFavourites(): void {
    const favouritesCounterElement: HTMLSpanElement = getfavouritesCounterElement();
    const beerObjToLocalStorage: Beer = {
      image_url: this.beer.image_url,
      name: this.beer.name,
      description: this.beer.description,
    }
    const favouriteBeersFromStorageAsString: string | null = localStorage.getItem('favouriteBeers');
    
    if(!favouriteBeersFromStorageAsString) {
      localStorage.setItem('favouriteBeers', JSON.stringify([beerObjToLocalStorage]));
      favouritesCounterElement.textContent = `${Number(favouritesCounterElement.textContent) + 1}`;
      this.changeAddButtonToRemoveButton();
      this.enableFavouritesButton();
    } else {
      const favouriteBeersFromStorageParsed: Beer[] = JSON.parse(favouriteBeersFromStorageAsString);
      const beerItemIndexInLocalStorage: number = favouriteBeersFromStorageParsed.findIndex((beer: Beer) => beer.name === beerObjToLocalStorage.name);

      if (beerItemIndexInLocalStorage === -1) {
        localStorage.setItem('favouriteBeers', JSON.stringify([...favouriteBeersFromStorageParsed, beerObjToLocalStorage]));
        favouritesCounterElement.textContent = `${Number(favouritesCounterElement.textContent) + 1}`;
        this.changeAddButtonToRemoveButton();
        this.enableFavouritesButton();
      }
    }
  }

  private changeAddButtonToRemoveButton(): void {
    const addToFavouritesButton: HTMLButtonElement = this.getAddToFavouritesButton();
    addToFavouritesButton.style.backgroundColor = 'rgb(126, 53, 53)';
    addToFavouritesButton.textContent = 'Remove';
  }

  private enableFavouritesButton(): void {
    const favouritesButtonElement: HTMLButtonElement = getFavouritesButtonElement();
    favouritesButtonElement.classList.remove('disabled');
  }

  private getAddToFavouritesButton(): HTMLButtonElement {
    const addToFavouritesButton: HTMLButtonElement | null = this._element.querySelector<HTMLButtonElement>('.card__actions-add-to-favourites-button');

    if (!addToFavouritesButton) {
      throw new Error('Add to favourites button not found!');
    }

    return addToFavouritesButton;
  }
}