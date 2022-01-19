import { Beer } from "../../types/beer";

export function checkIfIsFavourite(beer: Beer): boolean {
  const favouriteBeersFromStorageAsString: string | null = localStorage.getItem('favouriteBeers');
  let result: boolean = false;
  
  if (!favouriteBeersFromStorageAsString) {
    return result;
  }
  
  const favouriteBeersFromStorageAsArray: Beer[] = Array.from(JSON.parse(favouriteBeersFromStorageAsString));
  
  result = favouriteBeersFromStorageAsArray.some((beerFromStorage: Beer) => beerFromStorage.name === beer.name);

  return result;
}