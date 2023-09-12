import {
  getFullName,
  getLastNameWithInitials,
  getNameWithPatronymic
} from './userNames';

describe('test getLastNameWithInitials', () => 
{
  it('should return lastName + initials if all arguments (except subtitude) were passed', () => 
  {
    expect(getLastNameWithInitials('last', 'first', 'patronymic', ['sub1, sub2'])).toBe('Last F. P.');
    expect(getLastNameWithInitials('Last', 'First', 'patronymic', ['sub1, sub2'])).toBe('Last F. P.');
  });

  it('should return first non-empty substitude if lastName was not passed', () => 
  {
    expect(getLastNameWithInitials('', 'first', 'patronymic', ['', '', 'sub3'])).toBe('sub3');
    expect(getLastNameWithInitials('', 'first', 'patronymic', ['', 'sub2','sub3'])).toBe('sub2');
    expect(getLastNameWithInitials('', 'first', 'patronymic', ['sub1', '', 'sub3'])).toBe('sub1');
  });

  it('should return empty string if no lastName and substitude were passed', () => 
  {
    expect(getLastNameWithInitials('', '', 'patronymic', ['', ''])).toBe('');
    expect(getLastNameWithInitials('', 'first', 'patronymic', [''])).toBe('');
  });

  it('should return lastName + patronymic initial if no firstName was passed', () => 
  {
    expect(getLastNameWithInitials('last', '', 'patronymic', ['', 'sub2'])).toBe('Last P.');
    expect(getLastNameWithInitials('Last', '', 'Patronymic', ['', 'sub2'])).toBe('Last P.');
  });

  it('should return lastName + firstName initial if no patronymic was passed', () => 
  {
    expect(getLastNameWithInitials('last', 'first', '', ['sub1', 'sub2'])).toBe('Last F.');
    expect(getLastNameWithInitials('Last', 'First', '', ['sub1', 'sub2'])).toBe('Last F.');
  });

  it('should return only lastName if no patronymic and firstName were passed', () => 
  {
    expect(getLastNameWithInitials('last', '', '', ['sub1', 'sub2'])).toBe('Last');
    expect(getLastNameWithInitials('Last', '', '', ['sub1', 'sub2'])).toBe('Last');
  });
});

describe('test getNameWithPatronymic', () => 
{
  it('should return firstName + patronymic if all arguments (except subtitude) were passed', () => 
  {
    expect(getNameWithPatronymic('first', 'patronymic', ['sub1, sub2'])).toBe('First Patronymic');
    expect(getNameWithPatronymic('First', 'patronymic', ['sub1, sub2'])).toBe('First Patronymic');
  });

  it('should return first non-empty substitude if firstName was not passed', () => 
  {
    expect(getNameWithPatronymic('', 'patronymic', ['', '', 'sub3'])).toBe('sub3');
    expect(getNameWithPatronymic('', 'patronymic', ['', 'sub2', 'sub3'])).toBe('sub2');
    expect(getNameWithPatronymic('', 'patronymic', ['sub1', '', 'sub3'])).toBe('sub1');
  });

  it('should return empty string if no firstName and substitude were passed', () => 
  {
    expect(getNameWithPatronymic('', 'patronymic', ['', ''])).toBe('');
    expect(getNameWithPatronymic('', 'Patronymic', [''])).toBe('');
  });

  it('should return only firstName if no patronymic was passed', () => 
  {
    expect(getNameWithPatronymic('first', '', ['sub1', 'sub2'])).toBe('First');
    expect(getNameWithPatronymic('First', '', ['sub1', 'sub2'])).toBe('First');
  });
});

describe('test getFullName', () => 
{
  it('should return full name if all arguments (except subtitude) were passed', () => 
  {
    expect(getFullName('last', 'first', 'patronymic', ['sub1, sub2'])).toBe('Last First Patronymic');
    expect(getFullName('Last', 'First', 'patronymic', ['sub1, sub2'])).toBe('Last First Patronymic');
  });

  it('should return first non-empty substitude if no firstName and lastName were passed', () => 
  {
    expect(getFullName('', '', 'patronymic', ['', '', 'sub3'])).toBe('sub3');
    expect(getFullName('', '', '', ['', 'sub2', 'sub3'])).toBe('sub2');
    expect(getFullName('', '', 'Patronymic', ['sub1', '', 'sub3'])).toBe('sub1');
  });

  it('should return empty string if no firstName, lastName or substitudes were passed', () => 
  {
    expect(getFullName('', '', 'patronymic', ['', ''])).toBe('');
    expect(getFullName('', '', '', [''])).toBe('');
  });

  it('should return firstName + patronymic if no lastName was passed', () => 
  {
    expect(getFullName('', 'first', 'patronymic', ['sub1, sub2'])).toBe('First Patronymic');
    expect(getFullName('', 'first', 'patronymic', ['sub1, sub2'])).toBe('First Patronymic');
  });

  it('should return only lastName if no firstName and patronymic was passed', () => 
  {
    expect(getFullName('last', '', '', ['sub1', 'sub2'])).toBe('Last');
    expect(getFullName('Last', '', '', ['sub1', 'sub2'])).toBe('Last');
  });

  it('should return only firstName if no lastName and patronymic was passed', () => 
  {
    expect(getFullName('', 'first', '', ['sub1', 'sub2'])).toBe('First');
    expect(getFullName('', 'First', '', ['sub1', 'sub2'])).toBe('First');
  });
});
