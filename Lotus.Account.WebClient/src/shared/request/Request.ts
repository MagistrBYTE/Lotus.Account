import { IPageInfoRequest } from 'src/core/types/PageInfo';
import { IFilterObjects } from '../filtering/FilterProperty';
import { ISortObjects } from '../sorting/Sorting';

/**
 * Интерфейса запроса данных
 */
export interface IRequest
{
  /**
   * Информация о странице
   */
  pageInfo: IPageInfoRequest;

  /**
   * Параметры фильтрации данных
   */
  filtering?: IFilterObjects;

  /**
   * Параметры сортировки данных
   */
  sorting?: ISortObjects;
}