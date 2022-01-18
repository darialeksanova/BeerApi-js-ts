import { hideNavigateToTheTopArrow } from "./hide-navigate-to-the-top-arrow";
import { showNavigateToTheTopArrow } from "./show-navigate-to-the-top-arrow";

export function handleMainScroll(event: Event): void {
  const mainElement: HTMLElement = event.currentTarget as HTMLElement;

  if (mainElement.scrollTop < 150) {
    hideNavigateToTheTopArrow();
  } else {
    showNavigateToTheTopArrow();
  }
}