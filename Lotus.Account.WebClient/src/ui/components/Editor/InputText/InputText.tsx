import React, { useState } from 'react';
import { BaseTextFieldProps, SxProps, TextField, Typography } from '@mui/material';
import { Label } from '@mui/icons-material';

export interface IInputTextProps extends BaseTextFieldProps 
{
  /**
   * Дополнительное описание
   */
  textInfo?: string;

  /**
   * Показывать отдельно надпись
   */
  isShowLabel?: boolean;

  /**
   * Параметры надпись
   */
  labelProps?: SxProps;

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
}  

export const InputText = ({textInfo, onSetValue, initialValue, ...props}: IInputTextProps) =>
{
  const [value, setValue] = useState<string>(initialValue ?? '');
 
  if(props.label)
  {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%' }}>
        <Typography sx={props.labelProps}>{props.label}</Typography>
        <TextField {...props} label={undefined} />
      </div>);
  }
  else
  {
    return (<TextField {...props} />)
  }
};
