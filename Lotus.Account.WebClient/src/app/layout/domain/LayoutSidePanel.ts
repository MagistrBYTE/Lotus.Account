/**
 * Параметры боковой панели сайта
 */
export interface ILayoutSidePanel
{
  /**
   * Видна/Не видна
   */
  isVisible: boolean;

  /**
   * Открыта/Закрыта
   */
  isOpen: boolean;

  /**
   * Текущая ширина панели
   */
  width: number;

   /**
   * Максмальная ширина панели в открытом состоянии
   */
   maxWidth: number;

   /**
   * Минимальная ширина панели в закрытом состоянии
   */
   minWidth: number;    
}