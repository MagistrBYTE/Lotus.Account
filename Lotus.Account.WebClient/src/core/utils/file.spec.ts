import { getFileSize, splitNameAndExtension } from './file';

describe('test getFileSize', () => 
{
  it('should return file size', () => 
  {
    expect(getFileSize(0)).toBe('0 КБ');
    expect(getFileSize(829)).toBe('0.81 КБ');
    expect(getFileSize(5632)).toBe('5.5 КБ');
    expect(getFileSize(65424)).toBe('63.89 КБ');
    expect(getFileSize(12345640)).toBe('11.77 МБ');
    expect(getFileSize(78177935360)).toBe('72.81 ГБ');
  });
});

describe('test splitNameAndExtension', () => 
{
  it('should return file name and extension', () => 
  {
    expect(splitNameAndExtension('')).toEqual(['', '']);
    expect(splitNameAndExtension('name.ext')).toEqual(['name', '.ext']);
    expect(splitNameAndExtension('name_-123')).toEqual(['name_-123', '']);
    expect(splitNameAndExtension('name.')).toEqual(['name', '.']);
    expect(splitNameAndExtension('.ext')).toEqual(['', '.ext']);
    expect(splitNameAndExtension('..ext')).toEqual(['.', '.ext']);
    expect(splitNameAndExtension('pre.name.suf.ext')).toEqual(['pre.name.suf', '.ext']);
  });
});
