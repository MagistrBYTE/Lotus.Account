import { capitalizeFirstLetter } from './string';

describe('test capitalizeFirstLetter', () => 
{
  it('should capitalize first letter', () => 
  {
    expect(capitalizeFirstLetter('текст 123')).toBe('Текст 123');
    expect(capitalizeFirstLetter('тЕКСТ')).toBe('ТЕКСТ');
  });

  it('should return the same string if first symbol cannot be capitalized', () => 
  {
    expect(capitalizeFirstLetter('123 текст')).toBe('123 текст');
    expect(capitalizeFirstLetter('<> текст')).toBe('<> текст');
    expect(capitalizeFirstLetter('555')).toBe('555');
  });

  it('should return an empty string if it was passed', () => 
  {
    expect(capitalizeFirstLetter('')).toBe('');
  });
});
