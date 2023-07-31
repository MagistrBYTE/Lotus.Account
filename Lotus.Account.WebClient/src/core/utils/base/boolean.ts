export const getBooleanValue = (value: boolean, yes: string = 'Да', no: string = 'Нет') => 
{
  return (value ? yes : no);
}
