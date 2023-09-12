/**
 * 
 * @param $enum 
 * @returns 
 */
export const getEnumValues = <TEnum>($enum: Record<string, TEnum>): TEnum[] =>
{
  return Object.keys($enum).map((key) => $enum[key]);
}

export const getEnumNames = <TEnum>($enum: Record<string, TEnum>): string[] =>
{
  return Object.keys($enum).map((key) => key);
}
