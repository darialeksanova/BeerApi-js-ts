import { getToTheTopButtonElement } from "../element-getters/get-to-the-top-button-element";

export function hideNavigateToTheTopArrow(): void {
  const toTheTopButtonElement: HTMLButtonElement = getToTheTopButtonElement();
  toTheTopButtonElement.style.display = 'none';
}