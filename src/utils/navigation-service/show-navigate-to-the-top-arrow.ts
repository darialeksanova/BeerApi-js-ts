import { getToTheTopButtonElement } from "../element-getters/get-to-the-top-button-element";

export function showNavigateToTheTopArrow(): void {
  const toTheTopButtonElement: HTMLButtonElement = getToTheTopButtonElement();
  
  toTheTopButtonElement.style.display = 'flex';
}