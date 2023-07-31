import { RootState, useAppSelector } from 'src/app/store';

/**
 * Получение отступа от нижней части
 * @param delta Увеличение к расчету
 * @returns 
 */
export const useLayoutMarginBottom = (delta?: number):number =>
{
  const footer = useAppSelector((state: RootState) => state.layout.footer);
  const isFooter = footer.isVisible;
  let marginBottom = isFooter ? footer.height : 0;

  if(delta)
  {
    marginBottom += delta;
  }

  return marginBottom;
}
