import { Beer } from '../../types/beer';
import { BeerCardOptions } from '../../types/beer-card-options';
import { getFavouritesCounterElement } from '../../utils/element-getters/get-favourites-counter-element';
import { disableFavouritesButton } from '../../utils/favourites-service/disable-favourites-button';
import { enableFavouritesButton } from '../../utils/favourites-service/enable-favourites-button';

export class BeerCardElement {
  private _element: HTMLLIElement = document.createElement('li');

  constructor(private beer: Beer, options?: BeerCardOptions) {
    this._element.classList.add('card');
    this._element.innerHTML = `
      <div class="card__actions"></div>
      <div class="card__img">
        <img src=${beer.image_url} alt="image not found">
      </div>
      <div class="card__text">
        <h2 class="card__text-title">${beer.name}</h2>
        <p class="card__text-description">${beer.description}</p>
      </div>`;

    
    if (options?.isFavourite) {
      this.placeRemoveButtonOnTheCard();
    } else {
      this.placeAddButtonOnTheCard();
    }
  }

  public get element(): HTMLLIElement {
    return this._element;
  }

  private placeAddButtonOnTheCard(): void {
    const cardActionsElement: HTMLDivElement = this.getCardActionsElement();
    const addToFavouritesButtonElement: HTMLButtonElement = document.createElement('button');
    addToFavouritesButtonElement.classList.add('card__actions-add-to-favourites-button');
    addToFavouritesButtonElement.textContent = 'Add';
    cardActionsElement.append(addToFavouritesButtonElement);
    addToFavouritesButtonElement.addEventListener('click', this.addItemToFavourites.bind(this));
  }

  public placeRemoveButtonOnTheCard(): void {
    const cardActionsElement: HTMLDivElement = this.getCardActionsElement();
    const removeFromFavouritesButtonElement: HTMLButtonElement = document.createElement('button');
    removeFromFavouritesButtonElement.classList.add('card__actions-remove-from-favourites-button');
    removeFromFavouritesButtonElement.textContent = 'Remove';
    cardActionsElement.append(removeFromFavouritesButtonElement);
    removeFromFavouritesButtonElement.addEventListener('click', this.removeItemFromFavourites.bind(this));
  }

  private getCardActionsElement(): HTMLDivElement {
    const cardActionsElement: HTMLDivElement | null = this._element.querySelector<HTMLDivElement>('.card__actions');

    if (!cardActionsElement) {
      throw new Error('Card actions element not found!');
    }

    return cardActionsElement;
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
      enableFavouritesButton();
    } else {
      const favouriteBeersFromStorageParsed: Beer[] = JSON.parse(favouriteBeersFromStorageAsString);
      const beerItemIndexInLocalStorage: number = favouriteBeersFromStorageParsed.findIndex((beer: Beer) => beer.name === beerObjToLocalStorage.name);

      if (beerItemIndexInLocalStorage === -1) {
        localStorage.setItem('favouriteBeers', JSON.stringify([...favouriteBeersFromStorageParsed, beerObjToLocalStorage]));
        this.updateFavouritesCount([...favouriteBeersFromStorageParsed, beerObjToLocalStorage]);
        this.changeAddButtonToRemoveButton();
      }
    }
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
    const addToFavouritesButtonElement: HTMLButtonElement | null = this._element.querySelector<HTMLButtonElement>('.card__actions-add-to-favourites-button');

    if (!addToFavouritesButtonElement) {
      throw new Error('Add to favourites button element not found!');
    }

    return addToFavouritesButtonElement;
  }

  private getRemoveFromFavouritesButton(): HTMLButtonElement {
    const removeFromFavouritesButtonElement: HTMLButtonElement | null = this._element.querySelector<HTMLButtonElement>('.card__actions-remove-from-favourites-button');

    if (!removeFromFavouritesButtonElement) {
      throw new Error('remove from favourites button element not found!');
    }

    return removeFromFavouritesButtonElement;
  }

  private changeAddButtonToRemoveButton(): void {
    const addToFavouritesButtonElement: HTMLButtonElement = this.getAddToFavouritesButton();
    addToFavouritesButtonElement.remove();
    this.placeRemoveButtonOnTheCard();
  }

  private changeRemoveButtonToAddButton(): void {
    const removeFromFavouritesButtonElement: HTMLButtonElement = this.getRemoveFromFavouritesButton();
    removeFromFavouritesButtonElement.remove();
    this.placeAddButtonOnTheCard();
  }

  private updateFavouritesCount(favouriteBeers: Beer[]): void {
    const favouritesCounterElement: HTMLSpanElement = getFavouritesCounterElement();
    favouritesCounterElement.textContent = `${favouriteBeers.length}`;
  }
}