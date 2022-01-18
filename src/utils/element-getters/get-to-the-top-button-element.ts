export function getToTheTopButtonElement(): HTMLButtonElement {
  const toTheTopButtonElement: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('.actions__to-the-top');
  
  if (!toTheTopButtonElement) {
    throw new Error('To the top button element not found!');
  } 

  return toTheTopButtonElement;
}