import React, { useState } from 'react';
import { Checkbox, ListItemIcon, ListItemText, MenuItem, Select, SelectProps, SxProps, Typography } from '@mui/material';
import { ISelectOption, getSelectOptionTexts } from 'src/core/types/SelectOption';
import { TKey } from 'src/core/types/Key';

export interface IMultiSelectProps<TValueOption extends TKey = TKey> extends SelectProps
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
   * Функция обратного вызова для установки выбранных значений
   * @param selectedValues Выбранные значения или пустой массив
   * @returns 
   */
  onSetSelectedValues?: (selectedValues: TKey[])=>void;

  /**
   * Изначально выбранные значения
   */
  initialSelectedValues?: TValueOption[];
}  

export const MultiSelect = <TValueOption extends TKey = TKey>({label, options, onSetSelectedValues, initialSelectedValues, ...props}: IMultiSelectProps<TValueOption>) =>
{
  const [selectedValues, setSelectedValues] = useState<TValueOption[]>(initialSelectedValues ?? []);
  const [selectedTexts, setSelectedTexts] = useState<string[]>(getSelectOptionTexts(options, initialSelectedValues));

  const isNumberValue = typeof options[0].value === 'number';

  const getActualValue = (value: string):TValueOption =>
  {
    if(isNumberValue)
    {
      const numberValue:number = Number(value);
      return numberValue as TValueOption;
    }
    else
    {
      return value as TValueOption;
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => 
  {
    const value = getActualValue(event.target.value);
    if(checked)
    {
      if(!selectedValues.find(x => x === value))
      {
        const newValues = [...selectedValues];

        newValues.push(value);

        setSelectedValues(newValues);
        if(onSetSelectedValues)
        {
          onSetSelectedValues(newValues);
        }

        const newTexts:string[] = [];
        options.forEach(element => 
        {
          if(newValues.find((x) => x === element.value))
          {
            newTexts.push(element.text)
          }
        });

        setSelectedTexts(newTexts);
      }
    }
    else
    {
      const exist = selectedValues.find(x => x === value);
      if(exist)
      {
        const newValues = selectedValues.filter(x => x !== exist);
        setSelectedValues(newValues);

        if(onSetSelectedValues)
        {
          onSetSelectedValues(newValues);
        }
        
        const newTexts:string[] = [];
        options.forEach(element => 
        {
          if(newValues.find((x) => x === element.value))
          {
            newTexts.push(element.text)
          }
        });

        setSelectedTexts(newTexts);        
      }
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
          <Checkbox onChange={handleChange} value={option.value} checked={Boolean(selectedValues.indexOf(option.value as TValueOption) > -1)} />
          <span style={{paddingLeft: 8}}>{option.text}</span>
        </div>)
      }
      else
      {
        return (<>
          <ListItemIcon>
            {option.icon}
          </ListItemIcon>
          <Checkbox onChange={handleChange} value={option.value} checked={Boolean(selectedValues.indexOf(option.value as TValueOption) > -1)} />
          <span>{option.text}</span>
        </>)        
      }
    }
    else
    {
      return (<>
        <Checkbox onChange={handleChange} value={option.value} checked={Boolean(selectedValues.indexOf(option.value as TValueOption) > -1)} />
        <span>{option.text}</span>
      </>);
    }
  }

  const SelectNative = () =>
  {
    return <Select 
      value={selectedValues} 
      {...props} 
      multiple={true}
      renderValue={(selected) => selectedTexts.join(', ')}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <SelectNativeItem {...option}/>
        </MenuItem>
      ))}
    </Select> 
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
