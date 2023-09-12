/**
 * return true if url is in absolute form
 * see for details: https://stackoverflow.com/a/19709846
 * @param url url
 */
export const isAbsoluteUrl = (url: string) => 
{
  return new RegExp('^((?:[a-z]+:)?//|mailto:)', 'i').test(url);
}
