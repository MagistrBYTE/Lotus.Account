export const PHONE_MASK = '+7 (999) 999-99-99';
export const PHONE_MASK_PLACEHOLDER = '_';
export const PHONE_REGEX = /\+?7 ?\(?\d{3}\)? ?\d{3}-?\d{2}-?\d{2}/;
export const PHONE_REGEX_EXP: RegExp = new RegExp(/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/);
export const PHONE_ITU_FORMAT = '+7 ($1) $2-$3-$4';

export const normalizePhoneNumber = (phone: string):string => 
{
  return phone.replace(/[^\d]/g, '');
}

export const formatPhoneNumber = (phone: string, format: string = PHONE_ITU_FORMAT) =>
{
  phone.replace(/^\+{0,1}\d([\d*]{3})([\d*]{3})([\d*]{2})([\d*]{2})$/, format);
}
    
