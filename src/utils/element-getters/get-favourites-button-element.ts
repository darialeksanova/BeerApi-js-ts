export function getFavouritesButtonElement(): HTMLButtonElement {
  const favouritesButtonElement = document.querySelector<HTMLButtonElement>('.favourites__button');
  
  if (!favouritesButtonElement) {
    throw new Error('Favourites button element not found!');
  } 

  return favouritesButtonElement;
}