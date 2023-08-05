import { loadLayoutFromStorage } from './loadLayoutFromStorage';

/**
 * Получение отступа от нижней части
 * @param delta Увеличение к расчету
 * @returns 
 */
export const getLayoutMarginBottom = (delta?: number):number =>
{
  const layoutState = loadLayoutFromStorage();
  const footer = layoutState.footer;
  const isFooter = footer.isVisible;
  let marginBottom = isFooter ? footer.height : 0;

  if(delta)
  {
    marginBottom += delta;
  }

  return marginBottom;
}
