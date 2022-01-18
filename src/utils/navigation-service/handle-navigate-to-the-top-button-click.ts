import { calculateMainTopOffset } from "../calculations/calculate-main-top-offset";
import { getMainElement } from "../element-getters/get-main-element";

export function handleNavigateToTheTopButtonClick(): void {
  const mainElement = getMainElement();

  mainElement.scrollTo({
    top: calculateMainTopOffset(),
    left: 0,
    behavior: "smooth",
  });
}