/**
 * Визуальные настройки для каждого размера и ориентации устройства
 */
export interface IViewSettings
{
  /**
   * Высота загловка/шапка сайта
   */
  headerHeight: number;

  /**
  * Максимальная ширина левой панели
  */
  leftPanelWidthMax: number;

  /**
  * Минимальная ширина левой панели
  */
  leftPanelWidthMin: number; 

  /**
  * Максимальная ширина правой панели
  */
  rightPanelWidthMax: number;

  /**
  * Минимальная ширина правой панели
  */
  rightPanelWidthMin: number;   

  /**
   * Высота футера/подвал сайта
   */
  footerHeight: number; 
}

export const DesktopViewSettings:IViewSettings = 
{
  headerHeight: 64,
  leftPanelWidthMax: 240,
  leftPanelWidthMin: 60,
  rightPanelWidthMax: 240,
  rightPanelWidthMin: 60,
  footerHeight: 64
}

export const PortraitViewSettings:IViewSettings = 
{
  headerHeight: 56,
  leftPanelWidthMax: 240,
  leftPanelWidthMin: 60,
  rightPanelWidthMax: 240,
  rightPanelWidthMin: 60,
  footerHeight: 56
}

