/**
 *  Ответ в случаи неуспешного получения токена
 */
export interface IErrorAuthResponse 
{
  error: string;
  error_description: string;
  error_uri: string;
};

/**
 * Проверка объекта на поддержку интерфейса IErrorAuthResponse
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
export const checkOfErrorAuthResponse = (value: any): value is IErrorAuthResponse =>
{
  return ('error' in value) && ('error_description' in value);
}

/**
 * Преобразование объекта к интерфейсу IErrorAuthResponse 
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export const instanceOfErrorAuthResponse = (value: any): IErrorAuthResponse|undefined =>
{
  if(checkOfErrorAuthResponse(value))
  {
    return value as IErrorAuthResponse;
  }
  else
  {
    // eslint-disable-next-line consistent-return
    return undefined;
  }
}
