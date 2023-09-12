import { KeyLayoutState } from '../const/KeyLayoutState';
import { ILayoutState } from '../store/LayoutState';

/**
 * Сохранение текущего макета сайта в локальное хранилище
 * @param layoutState Макет сайта
 */
export const saveLayoutToStorage = (layoutState: ILayoutState) =>
{
  const value = JSON.stringify(layoutState);
  localStorage.setItem(KeyLayoutState, value);
}
