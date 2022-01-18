import { Beer } from '../../types/beer';
import { getFavouritesCounterElement } from '../../utils/element-getters/get-favourites-counter-element';
import { disableFavouritesButton } from '../../utils/favourites-service/disable-favourites-button';
import { enableFavouritesButton } from '../../utils/favourites-service/enable-favourites-button';

export class BeerCardElement {
  private _element: HTMLLIElement = document.createElement('li');

  constructor(private beer: Beer) {
    this._element.classList.add('card');
    this._element.innerHTML = `
      <div class="card__actions">
        <button class="card__actions-add-to-favourites-button">Add</button>
        <button class="card__actions-remove-from-favourites-button">Remove</button>
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
    const beerObjToLocalStorage: Beer = {
      image_url: this.beer.image_url,
      name: this.beer.name,
      description: this.beer.description,
    }
    const favouriteBeersFromStorageAsString: string | null = localStorage.getItem('favouriteBeers');
    
    if(!favouriteBeersFromStorageAsString) {
      localStorage.setItem('favouriteBeers', JSON.stringify([beerObjToLocalStorage]));
      this.updateFavouritesCount([beerObjToLocalStorage]);
      this.changeAddButtonToRemoveButton();
      this.setRemoveFromFavouritesButtonClickLIstener();
      enableFavouritesButton();
    } else {
      const favouriteBeersFromStorageParsed: Beer[] = JSON.parse(favouriteBeersFromStorageAsString);
      const beerItemIndexInLocalStorage: number = favouriteBeersFromStorageParsed.findIndex((beer: Beer) => beer.name === beerObjToLocalStorage.name);

      if (beerItemIndexInLocalStorage === -1) {
        localStorage.setItem('favouriteBeers', JSON.stringify([...favouriteBeersFromStorageParsed, beerObjToLocalStorage]));
        this.updateFavouritesCount([...favouriteBeersFromStorageParsed, beerObjToLocalStorage]);
        this.changeAddButtonToRemoveButton();
        this.setRemoveFromFavouritesButtonClickLIstener();
      }
    }
  }

  private setRemoveFromFavouritesButtonClickLIstener(): void {
    const removeFromFavouritesButton: HTMLButtonElement = this.getRemoveFromFavouritesButton();
    removeFromFavouritesButton.addEventListener('click', this.removeItemFromFavourites.bind(this));
  }

  private removeItemFromFavourites(): void {
    const favouriteBeersFromStorageAsString: string | null = localStorage.getItem('favouriteBeers');

    if (!favouriteBeersFromStorageAsString) {
      return;
    }

    const favouriteBeersFromStorageParsed: Beer[] = JSON.parse(favouriteBeersFromStorageAsString);
    const favouriteBeersUpdated: Beer[] = favouriteBeersFromStorageParsed.filter((beer: Beer) => beer.name !== this.beer.name);
    
    if (!favouriteBeersUpdated.length) {
      localStorage.removeItem('favouriteBeers');
      disableFavouritesButton();
    } else {
      localStorage.setItem('favouriteBeers', JSON.stringify(favouriteBeersUpdated));
    }

    this.updateFavouritesCount(favouriteBeersUpdated);
    this.changeRemoveButtonToAddButton();
  }

  private getAddToFavouritesButton(): HTMLButtonElement {
    const addToFavouritesButton: HTMLButtonElement | null = this._element.querySelector<HTMLButtonElement>('.card__actions-add-to-favourites-button');

    if (!addToFavouritesButton) {
      throw new Error('Add to favourites button not found!');
    }

    return addToFavouritesButton;
  }

  private getRemoveFromFavouritesButton(): HTMLButtonElement {
    const removeFromFavouritesButton: HTMLButtonElement | null = this._element.querySelector<HTMLButtonElement>('.card__actions-remove-from-favourites-button');

    if (!removeFromFavouritesButton) {
      throw new Error('Add to favourites button not found!');
    }

    return removeFromFavouritesButton;
  }

  private changeAddButtonToRemoveButton(): void {
    const addToFavouritesButton: HTMLButtonElement = this.getAddToFavouritesButton();
    const removeFromFavouritesButton: HTMLButtonElement = this.getRemoveFromFavouritesButton();
    addToFavouritesButton.style.display = 'none';
    removeFromFavouritesButton.style.display = 'flex';
  }

  private changeRemoveButtonToAddButton(): void {
    const removeFromFavouritesButton: HTMLButtonElement = this.getRemoveFromFavouritesButton();
    const addToFavouritesButton: HTMLButtonElement = this.getAddToFavouritesButton();
    addToFavouritesButton.style.display = 'flex';
    removeFromFavouritesButton.style.display = 'none';
  }

  private updateFavouritesCount(favouriteBeers: Beer[]): void {
    const favouritesCounterElement: HTMLSpanElement = getFavouritesCounterElement();
    favouritesCounterElement.textContent = `${favouriteBeers.length}`;
  }
}