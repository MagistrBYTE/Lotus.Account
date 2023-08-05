import { ILayoutState, defaultStateDesktop } from '../store/LayoutState';

/**
 * Загрузка макета сайта из локального хранилища 
 * @returns Макет сайта или макет сайта по умолчанию
 */
export const loadLayoutFromStorage = ():ILayoutState =>
{
  const key = 'layoutState';
  const value = localStorage.getItem(key);
  if(value)
  {
    const layoutState:ILayoutState = JSON.parse(value);
    return layoutState;
  }
  else
  {
    return defaultStateDesktop;
  }
}
