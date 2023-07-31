import { formatNumber } from './base/numbers';

/**
 * 
 * @param file 
 * @param fileName 
 */
export const downloadBlobFile = (file: Blob, fileName: string): void => 
{
  const downloadUrl = window.URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

/**
 * 
 * @param sizeInBytes 
 * @returns 
 */
export const getFileSize = (sizeInBytes: number): string => 
{
  let size = sizeInBytes / 1024;
  if (size < 1000) 
  {
    return `${formatNumber(size)} КБ`;
  }

  size = size / 1024;
  if (size < 1000) 
  {
    return `${formatNumber(size)} МБ`;
  }

  size = size / 1024;
  return `${formatNumber(size)} ГБ`;
};

/**
 * 
 * @param fileName 
 * @returns 
 */
export const splitNameAndExtension = (fileName: string): [string, string] => 
{
  const index = fileName.lastIndexOf('.');
  if (index !== -1) 
  {
    return [fileName.substring(0, index), fileName.substring(index)];
  }

  return [fileName, ''];
};

