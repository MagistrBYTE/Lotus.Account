import { SerializedError } from '@reduxjs/toolkit';

export const getErrorText = (value: SerializedError) => 
{
  const newChar = '\n';
  return `code = ${value.code}${newChar}name = ${value.name}${newChar}message = ${value.message}`;
}
