export function getfavouritesCounterElement(): HTMLSpanElement {
  const favouritesCounterElement = document.querySelector<HTMLSpanElement>('.favourites__counter');
  
  if (!favouritesCounterElement) {
    throw new Error('Favourites counter element not found!');
  } 

  return favouritesCounterElement;
}