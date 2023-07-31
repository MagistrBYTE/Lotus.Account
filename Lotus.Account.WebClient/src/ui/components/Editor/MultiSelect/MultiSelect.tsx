import React, { useState } from 'react';
import { Checkbox, ListItemText, MenuItem, Select, SelectProps } from '@mui/material';
import { ISelectOption, getSelectOptionTexts } from 'src/core/types/SelectOption';
import { TKey } from 'src/core/types/Key';

export interface IMultiSelectProps<TValue extends TKey = string> extends SelectProps
{
  options: ISelectOption<TValue>[];
  selectedValuesChange?: (selectedValues: TValue[])=>void;
  initialSelectedValues?: TValue[];
}  

export const MultiSelect = <TValue extends TKey = string>({options, selectedValuesChange, initialSelectedValues, ...props}: IMultiSelectProps<TValue>) =>
{
  const [selectedValues, setSelectedValues] = useState<TValue[]>(initialSelectedValues ?? []);
  const [selectedTexts, setSelectedTexts] = useState<string[]>(getSelectOptionTexts(options, initialSelectedValues));

  const isNumberValue = typeof options[0].value === 'number';

  const getActualValue = (value: string):TValue =>
  {
    if(isNumberValue)
    {
      const numberValue:number = Number(value);
      return numberValue as TValue;
    }
    else
    {
      return value as TValue;
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
        if(selectedValuesChange)
        {
          selectedValuesChange(newValues);
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

        if(selectedValuesChange)
        {
          selectedValuesChange(newValues);
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
  
  return <Select 
    value={selectedValues} 
    {...props} 
    multiple={true}
    renderValue={(selected) => selectedTexts.join(', ')}
  >
    {options.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        <Checkbox onChange={handleChange} value={option.value} checked={Boolean(selectedValues.indexOf(option.value) > -1)} />
        <ListItemText primary={option.text} />
      </MenuItem>
    ))}

  </Select>
};
