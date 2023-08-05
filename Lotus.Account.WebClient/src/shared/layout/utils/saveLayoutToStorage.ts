import { ILayoutState } from '../store/LayoutState';

/**
 * Сохранение текущего макета сайта в локальное хранилище
 * @param layoutState Макет сайта
 */
export const saveLayoutToStorage = (layoutState: ILayoutState) =>
{
  const value = JSON.stringify(layoutState);
  const key = 'layoutState';
  localStorage.setItem(key, value);
}
