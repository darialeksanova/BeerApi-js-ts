export function getRecentSearchesElement(): HTMLElement {
  const recentSearchesElement = document.querySelector<HTMLElement>('.recent-searches');
  
  if (!recentSearchesElement) {
    throw new Error('Recent searches element not found!');
  }

  return recentSearchesElement;
}