import { Beer } from "../../types/beer";
import { BeerCardElement } from "../beer-card/beer-card";

export class ModalWindowElement {
  private _element: HTMLDivElement = document.createElement('div');

  constructor() {
    this._element.classList.add('modal');
    this._element.innerHTML = `
      <div class="modal__backdrop"></div>
      <div class="modal__window"></div>
    `;

    this.showListOfFavourites();
    this.setModalBackdropClickListener();
  }

  public get element(): HTMLDivElement {
    return this._element;
  }

  private showListOfFavourites(): void {
    const modalWindowElement: HTMLDivElement = this.getModalWindowElement();
    const favouriteBeersFromStorageAsString: string | null = localStorage.getItem('favouriteBeers');

    if (favouriteBeersFromStorageAsString) {
      modalWindowElement.innerHTML = '';
      const favouriteBeersFromStorageAsArray: Beer[] = Array.from(JSON.parse(favouriteBeersFromStorageAsString));
      favouriteBeersFromStorageAsArray.forEach((beer: Beer) => {
        const beerElement: HTMLLIElement = new BeerCardElement(beer, { isFavourite: true }).element;
        modalWindowElement.append(beerElement);
        const removeFromFavouritesButtonElement: HTMLButtonElement | null = beerElement.querySelector('.card__actions-remove-from-favourites-button');
  
        if (!removeFromFavouritesButtonElement) {
          throw new Error('Remove from favourites button element not found!');
        }
  
        this.setRemoveFromFavouritesButtonClickListener(removeFromFavouritesButtonElement);
      });
    } else {
      this.closeModal();
    }
  }

  private setRemoveFromFavouritesButtonClickListener(button: HTMLButtonElement): void {
    button.addEventListener('click', this.showListOfFavourites.bind(this));
  }

  private getModalWindowElement(): HTMLDivElement {
    const modalWindowElement: HTMLDivElement | null = this._element.querySelector<HTMLDivElement>('.modal__window');
    
    if (!modalWindowElement) {
      throw new Error('Modal window element not found!');
    }
  
    return modalWindowElement;
  }

  private getModalBackdropElement(): HTMLDivElement {
    const modalBackdropElement: HTMLDivElement | null = this._element.querySelector<HTMLDivElement>('.modal__backdrop');
    
    if (!modalBackdropElement) {
      throw new Error('Modal backdrop element not found!');
    }
  
    return modalBackdropElement;
  }

  private setModalBackdropClickListener(): void {
    const modalBackdropElement: HTMLDivElement = this.getModalBackdropElement();
    modalBackdropElement.addEventListener('click', this.closeModal.bind(this));
  }

  private closeModal(): void {
    this._element.remove();
  }
}