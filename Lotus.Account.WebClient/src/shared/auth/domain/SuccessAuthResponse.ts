/**
 *  Ответ в случаи успешного получения токена
 */
export interface ISuccessAuthResponse 
{
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
};

/**
 * Проверка объекта на поддержку интерфейса ISuccessAuthResponse
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
export const checkOfSuccessAuthResponse = (value: any): value is ISuccessAuthResponse =>
{
  if(value)
  {
    const access_token = ('access_token' in value);
    const expires_in = ('expires_in' in value);
    const refresh_token = ('refresh_token' in value);

    return  access_token && expires_in && refresh_token;
  }

  return false;
}

/**
 * Преобразование объекта к интерфейсу ISuccessAuthResponse 
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export const instanceOfSuccessAuthResponse = (value: any): ISuccessAuthResponse|undefined =>
{
  if(checkOfSuccessAuthResponse(value))
  {
    return value as ISuccessAuthResponse;
  }
  else
  {
    // eslint-disable-next-line consistent-return
    return undefined;
  }
}