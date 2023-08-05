import { TScreenType } from '../domain/ScreenType';
import { ILayoutFooter } from '../domain/LayoutFooter';
import { ILayoutHeader } from '../domain/LayoutHeader';
import { ILayoutSidePanel } from '../domain/LayoutSidePanel';
import { DesktopViewSettings } from '../domain/ViewSettings';

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

/**
 * Макет сайта по умолчанию для десктопного сайта
 */
export const defaultStateDesktop: ILayoutState = {

  screenType: TScreenType.Desktop,

  header:
  {
    height: DesktopViewSettings.headerHeight,
    isVisible: true
  },
  leftPanel:
  {
    isVisible: true,
    isOpen: false,
    maxWidth: DesktopViewSettings.leftPanelWidthMax,
    minWidth: DesktopViewSettings.leftPanelWidthMin,
    width: DesktopViewSettings.leftPanelWidthMin
  },
  rightPanel:
  {
    isVisible: false,
    isOpen: false,
    maxWidth: DesktopViewSettings.rightPanelWidthMax,
    minWidth: DesktopViewSettings.rightPanelWidthMin,
    width: DesktopViewSettings.rightPanelWidthMin
  },
  footer:
  {
    height: DesktopViewSettings.footerHeight,
    isVisible: true,
    isCollapsed: true
  }
};
