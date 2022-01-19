import { Beer } from "../../types/beer";
import { BeerCardElement } from "../beer-card/beer-card";

export class SingleItemModalWindow {
  private _element = document.createElement('div');

  constructor(private beerItem: Beer) {
    this._element.classList.add('modal');
    this._element.innerHTML = `
      <div class="modal__backdrop"></div>
      <div class="modal__window">
        <button class="modal__window-close-button">Esc</button>
      </div>
    `;

    this.showSingleItem();
    this.setCloseButtonClickListener();
    this.setModalBackdropClickListener();
  }

  public get element(): HTMLDivElement {
    return this._element;
  }

  private showSingleItem(): void {
    const modalWindowElement: HTMLDivElement = this.getModalWindowElement();
    modalWindowElement.append(new BeerCardElement(this.beerItem, { isImageClickable: false }).element);
  }

  private getModalWindowElement(): HTMLDivElement {
    const modalWindowElement: HTMLDivElement | null = this._element.querySelector<HTMLDivElement>('.modal__window');
    
    if (!modalWindowElement) {
      throw new Error('Modal window element not found!');
    }
  
    return modalWindowElement;
  }

  private getCloseButtonElement(): HTMLButtonElement {
    const closeButtonElement: HTMLButtonElement | null = this._element.querySelector<HTMLButtonElement>('.modal__window-close-button');
    
    if (!closeButtonElement) {
      throw new Error('Close button element not found!');
    }
  
    return closeButtonElement;
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

  private setCloseButtonClickListener(): void {
    const closeButtonElement: HTMLButtonElement = this.getCloseButtonElement();
    
    closeButtonElement.addEventListener('click', this.closeModal.bind(this));
  }

  private closeModal(): void {
    this._element.remove();
  }
}