import React, { ChangeEvent, ReactNode, useState } from 'react';
import { BaseTextFieldProps, TextField } from '@mui/material';
import { ILabelProps, Label } from '../../Display/Label';
import { HorizontalStack } from '../../Layout';

export interface IInputTextProps extends BaseTextFieldProps, ILabelProps
{
  /**
   * Функция обратного вызова для установки введеного значения
   * @param value Выбранное значение
   * @returns 
   */
  onSetValue?: (value: string)=>void;

  /**
   * Изначально значение
   */  
  initialValue?: string;

  /**
   * Дополнительный элемент справа
   */
  rightElement?: ReactNode;  
}  

export const InputText: React.FC<IInputTextProps> = ({onSetValue, initialValue, 
  textInfo, textInfoKey, labelStyle, isTopLabel, rightElement, ...props}: IInputTextProps) =>
{
  const [value, setValue] = useState<string>(initialValue ?? '');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
  {
    setValue(event.target.value);
    if(onSetValue)
    {
      onSetValue(event.target.value);
    }
  }
 
  return (
    <Label
      label={props.label}
      labelStyle={labelStyle}
      isTopLabel={isTopLabel}
      fullWidth={props.fullWidth} 
      textInfo={textInfo} 
      textInfoKey={textInfoKey} >
      <HorizontalStack fullWidth>  
        <TextField {...props} onChange={handleChange} label={undefined} value={value} />
        {rightElement}
      </HorizontalStack>
    </Label>);  
};
