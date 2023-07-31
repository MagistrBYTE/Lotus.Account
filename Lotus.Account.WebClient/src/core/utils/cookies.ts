/**
 * возвращает куки с указанным name или undefined, если ничего не найдено
 * @param name Имя куки
 * @returns куки с указанным name или undefined, если ничего не найдено
 */
export function getCookie(name:string):string|undefined 
{
  const matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

/**
 * 
 * @param name 
 * @param value 
 * @param encodeValue 
 * @param options 
 */
export function setCookie(name:string, value:string, encodeValue:boolean = true, options = {}) 
{
  const currentOptions = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options
  } as any;
  
  if (currentOptions['expires'] instanceof Date) 
  {
    currentOptions['expires'] = currentOptions['expires'].toUTCString();
  }
  
  let updatedCookie = encodeURIComponent(name) + '=' + (encodeValue ? encodeURIComponent(value) : value);
  
  for (const optionKey in currentOptions) 
  {
    updatedCookie += '; ' + optionKey;
    const optionValue = currentOptions[optionKey];
    if (optionValue !== true) 
    {
      updatedCookie += '=' + optionValue;
    }
  }
  
  document.cookie = updatedCookie;
}

/**
 * 
 * @param name 
 * @param encodeValue 
 * @param options 
 */
export function deleteCookie(name:string, encodeValue:boolean = true, options = {}) 
{
  setCookie(name, '', encodeValue, {
    'max-age': -1,
    ...options
  })
}

/**
 * 
 */
export function deleteAllCookies() 
{
  const cookies = document.cookie.split(';');
  
  for (let i = 0; i < cookies.length; i++) 
  {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
} 