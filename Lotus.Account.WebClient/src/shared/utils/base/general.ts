/**
 * 
 * @param value 
 * @returns 
 */
export const isNullOrUndefined = (value: unknown) => 
{
  return value === undefined || value === null;
}

/**
 * 
 * @param from 
 * @param to 
 * @returns 
 */
export const getArrayFromTo = (from: number, to: number): number[] => 
{
  const result = [];

  for (let i = from; i <= to; i++) 
  {
    result.push(i);
  }

  return result;
};

/**
 * 
 * @param object 
 * @returns 
 */
export const isObjectValuesEmpty = (object: object):boolean => 
{
  return !Object.values(object).some((value) => value !== undefined)
}

