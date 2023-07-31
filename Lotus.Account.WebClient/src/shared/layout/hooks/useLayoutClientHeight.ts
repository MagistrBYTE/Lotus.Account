import { RootState, useAppSelector } from 'src/app/store';

/**
 * Получение рабочей высоты сайта 
 * @param delta Уменьшение к расчету
 * @returns 
 */
export const useLayoutClientHeight = (delta?: number):number =>
{
  const layoutState = useAppSelector((state: RootState) => state.layout);
  const isFooter = layoutState.footer.isVisible;
  const isHeader = layoutState.header.isVisible;

  let screenClient = screen.height;

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
