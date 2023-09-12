import { toUpperCaseAllFirstLetters } from './base/string';

/**
 * 
 * @param lastName 
 * @param firstName 
 * @param patronymic 
 * @param substitutes 
 * @returns 
 */
export const getLastNameWithInitials = (lastName: string | null, firstName: string | null, patronymic: string | null, substitutes?: Array<string | null>) =>
{
  if (!lastName) 
  {
    return ((substitutes && substitutes.find((sub: string | null) => !!sub)) || '');
  }

  return toUpperCaseAllFirstLetters(`${lastName}${firstName ? ` ${firstName[0]}.` : ''}${patronymic ? ` ${patronymic[0]}.` : ''}`);
};

/**
 * 
 * @param firstName 
 * @param patronymic 
 * @param substitutes 
 * @returns 
 */
export const getNameWithPatronymic = (firstName: string | null, patronymic: string | null, substitutes?: Array<string | null>) => 
{
  if (!firstName) 
  {
    return ((substitutes && substitutes.find((sub: string | null) => !!sub)) || '');
  }

  return toUpperCaseAllFirstLetters(`${firstName}${patronymic ? ` ${patronymic}` : ''}`);
};

/**
 * 
 * @param lastName 
 * @param firstName 
 * @param patronymic 
 * @param substitutes 
 * @returns 
 */
export const getFullName = (lastName: string | null, firstName: string | null, patronymic: string | null, substitutes?: Array<string | null>) => 
{
  if (!lastName) 
  {
    return getNameWithPatronymic(firstName, patronymic, substitutes);
  }

  const nameWithPatronymic = getNameWithPatronymic(firstName, patronymic);

  if (nameWithPatronymic) 
  {
    return toUpperCaseAllFirstLetters(`${lastName} ${nameWithPatronymic}`);
  }
  else 
  {
    return toUpperCaseAllFirstLetters(lastName);
  }
};
