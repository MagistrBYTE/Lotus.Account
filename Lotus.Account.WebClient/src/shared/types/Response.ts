import { IPageInfoResponse } from './PageInfo';
import { IResult } from './Result';

/**
 * Интерфейса для получения данных
 */
export interface IResponse<TPayload = any>
{
  /**
   * Результат
   */
  result?: IResult;

  /**
   * Данные
   */
  payload?: TPayload;
}

/**
 * Интерфейс для постраничного получения данных
 */
export interface IResponsePage<TPayload = any>
{
  /**
   * Результат
   */
  result?: IResult;

  /**
  * Данные
  */
  payload?: TPayload[];

  /**
   * Информация о странице
   */
  pageInfo?: IPageInfoResponse;
}