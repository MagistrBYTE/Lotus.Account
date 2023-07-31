/**
 * Параметры подвала сайта
 */
export interface ILayoutFooter
{
  /**
   * Виден основной футер/подвал сайта
   */
  isVisible: boolean;

  /**
   * Свернут футер/подвал сайта
   */
  isCollapsed: boolean;  

  /**
   * Высота футера/подвала сайта
   */
  height: number;
}
