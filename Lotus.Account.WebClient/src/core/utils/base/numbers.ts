import numeral from 'numeral';

export const NUMBER_CURRENCY_FORMAT = '0,0[.]00';
export const NUMBER_PERCENTAGE_FORMAT = '0,0[.]00%';
export const NUMBER_DEFAULT_FORMAT = '0,0[.][00]';

export const formatNumber = (number: number) => 
{
  return numeral(number).format(NUMBER_DEFAULT_FORMAT);
}

export const formatCurrency = (amount: number) => 
{
  return numeral(amount).format(NUMBER_CURRENCY_FORMAT);
}

export const formatPercentage = (amount: number) => 
{
  return numeral(amount).format(NUMBER_DEFAULT_FORMAT);
}
