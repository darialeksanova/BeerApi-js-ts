import { getToTheTopButtonElement } from "../element-getters/get-to-the-top-button-element";

export function showNavigateToTheTopArrow(): void {
  const toTheTopButtonElement = getToTheTopButtonElement();
  toTheTopButtonElement.style.display = 'flex';
}