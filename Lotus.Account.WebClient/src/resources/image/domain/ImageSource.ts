
/**
 * Категория изображения
 */
export enum TImageSourceCategory
{
  /**
   * Общие по интерфейсу
   */  
  Interface = 'Interface',

  /**
   * Аватары персонажей
   */
  Avatar = 'Avatar',

  /**
   * Инвентарь
   */
  Inventory = 'Inventory',

  /**
   * Объекты карты
   */
  Map = 'Map',
}


/**
 * Класс изображения
 */
export interface IImageSource
{
  /**
   * Идентификатор изображения
   */
  id: number;

  /**
   * Название изображения
   */
  name: string;

  /**
   * Категория изображения
   */
  category?: TImageSourceCategory;

  /**
   * Строка с данными изображения
   */
  source: string;
}