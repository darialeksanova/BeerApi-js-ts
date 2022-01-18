export function getMainElement(): HTMLElement {
  const mainElement = document.querySelector<HTMLElement>('.main');
  
  if (!mainElement) {
    throw new Error('Main element not found!');
  }

  return mainElement;
}