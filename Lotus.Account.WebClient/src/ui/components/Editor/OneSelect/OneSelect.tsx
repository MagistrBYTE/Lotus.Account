import { readSync } from 'fs';
import React, { ReactNode, useState } from 'react';
import { Checkbox, ListItemIcon, ListItemText, MenuItem, Select, SelectChangeEvent, SelectProps, SxProps, Typography } from '@mui/material';
import { ISelectOption, getDefaulValueSelectOption, getSelectOptionIcon, getSelectOptionText, getSelectOptionTexts } from 'src/core/types/SelectOption';
import { TKey } from 'src/core/types/Key';
import { ContentCut } from '@mui/icons-material';

export interface IOneSelectProps<TValueOption extends TKey = TKey> extends SelectProps<TValueOption>
{
   /**
   * Дополнительное описание
   */
  textInfo?: string;

  /**
   * Надпись
   */
  label?: string;

  /**
   * Параметры надписи
   */
  labelProps?: SxProps;  

  /**
   * Список опций
   */  
  options: ISelectOption[];

  /**
   * Функция обратного вызова для установки выбранного значения
   * @param selectedValues Выбранное значение
   * @returns 
   */
  onSetSelectedValue?: (selectedValue: TValueOption)=>void;

  /**
   * Изначально выбранное значение
   */  
  initialSelectedValue?: TValueOption;
}  

export const OneSelect = <TValueOption extends TKey = TKey>({label, options, onSetSelectedValue, initialSelectedValue, ...props}: IOneSelectProps<TValueOption>) =>
{
  const [selectedValue, setSelectedValue] = useState<TValueOption>(getDefaulValueSelectOption(options, initialSelectedValue));
  const [selectedText, setSelectedText] = useState<string>(getSelectOptionText(options, initialSelectedValue));
  const [selectedIcon, setSelectedIcon] = useState<ReactNode|undefined>(getSelectOptionIcon(options, initialSelectedValue));

  const handleChange = (event: SelectChangeEvent<TValueOption>) => 
  {
    const value = event.target.value as TValueOption;
    setSelectedValue(value);
    setSelectedText(getSelectOptionText(options, value));
    setSelectedIcon(getSelectOptionIcon(options, value));
    if(onSetSelectedValue)
    {
      onSetSelectedValue(value);
    }
  };

  const SelectNativeItem = (option:ISelectOption) =>
  {
    if(option.icon)
    {
      if(typeof option.icon === 'string')
      {
        return (<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
          <img src={option.icon} width="32" height="32"/>
          <span style={{paddingLeft: 8}}>{option.text}</span>
        </div>)
      }
      else
      {
        return (<>
          <ListItemIcon>
            {option.icon}
          </ListItemIcon>
          <span>{option.text}</span>
        </>)        
      }
    }
    else
    {
      return <span>{option.text}</span>;
    }
  }

  const SelectNative = () =>
  {
    return (<Select
      value={selectedValue} 
      {...props} 
      renderValue={(selected) => 
      {
        const option = options.find((x) => x.value === selected)!;
        return <SelectNativeItem {...option} />
      }}
      onChange={handleChange}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <SelectNativeItem {...option} />
        </MenuItem>
      ))}
    </Select>);
  }

  if(label && label !== '')
  {
    return (<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%' }}>
      <Typography sx={props.labelProps}>{label}</Typography>
      <SelectNative/>
    </div>)
  }

  return <SelectNative/>
};
