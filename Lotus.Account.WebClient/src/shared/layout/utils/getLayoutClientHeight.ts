import { TScreenType } from '../domain/ScreenType';
import { loadLayoutFromStorage } from './loadLayoutFromStorage';

/**
 * Получение рабочей высоты сайта 
 * @param delta Уменьшение к расчету
 * @returns 
 */
export const getLayoutClientHeight = (delta?: number):number =>
{
  const layoutState = loadLayoutFromStorage();
  const isFooter = layoutState.footer.isVisible;
  const isHeader = layoutState.header.isVisible;

  let screenClient = window.innerHeight;

  if(isHeader)
  {
    screenClient -= layoutState.header.height;
  }

  if(isFooter)
  {
    screenClient -= layoutState.footer.height;
  }
  
  if(delta)
  {
    screenClient -= delta;
  }  

  return screenClient;
}
