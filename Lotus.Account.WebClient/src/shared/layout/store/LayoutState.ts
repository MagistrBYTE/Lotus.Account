import { TScreenType } from '../domain/ScreenType';
import { ILayoutFooter } from '../domain/LayoutFooter';
import { ILayoutHeader } from '../domain/LayoutHeader';
import { ILayoutSidePanel } from '../domain/LayoutSidePanel';

/**
 * Состояние макета сайта
 */
export interface ILayoutState
{
  /**
   * Параметры типа/ориентация экрана
   */
  screenType: TScreenType;  

  /**
   * Параметры шапки сайта
   */
  header: ILayoutHeader;

  /**
  * Параметры левой панели
  */
  leftPanel: ILayoutSidePanel;

  /**
  * Параметры правой панели
  */
  rightPanel: ILayoutSidePanel; 

  /**
   * Параметры подвала сайта
   */
  footer: ILayoutFooter;
}
