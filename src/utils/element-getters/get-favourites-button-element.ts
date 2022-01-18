export function getFavouritesButtonElement(): HTMLButtonElement {
  const favouritesButtonElement: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('.favourites__button');
  
  if (!favouritesButtonElement) {
    throw new Error('Favourites button element not found!');
  } 

  return favouritesButtonElement;
}