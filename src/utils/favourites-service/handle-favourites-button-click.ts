import { ModalWindowElement } from "../../components/favourites-modal-window/favourites-modal-window";
import { getMainElement } from "../element-getters/get-main-element";

export function handleFavouritesButtonClick(): void {
  const mainElement: HTMLElement = getMainElement();
  
  mainElement.append(new ModalWindowElement().element);
}