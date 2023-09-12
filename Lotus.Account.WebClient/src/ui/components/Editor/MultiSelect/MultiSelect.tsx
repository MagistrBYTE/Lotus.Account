import React, { ReactNode, useState } from 'react';
import { Checkbox, ListItemIcon, MenuItem, Select, SelectProps } from '@mui/material';
import { ISelectOption, getSelectOptionTexts } from 'src/shared/types/SelectOption';
import { TKey } from 'src/shared/types/Key';
import { ILabelProps, Label } from '../../Display/Label';
import { HorizontalStack } from '../../Layout';

export interface IMultiSelectProps<TValueOption extends TKey = TKey> extends SelectProps, Omit<ILabelProps, 'label'>
{
  /**
   * Список опций
   */
  options: ISelectOption[];

  /**
   * Функция обратного вызова для установки выбранных значений
   * @param selectedValues Выбранные значения или пустой массив
   * @returns 
   */
  onSetSelectedValues?: (selectedValues: TValueOption[])=>void;

  /**
   * Изначально выбранные значения
   */
  initialSelectedValues?: TValueOption[];

  /**
   * Дополнительный элемент справа
   */
  rightElement?: ReactNode;
}  

export const MultiSelect = <TValueOption extends TKey = TKey>({options, onSetSelectedValues, initialSelectedValues, 
  textInfo, textInfoKey, labelStyle, isTopLabel, rightElement, ...props}: IMultiSelectProps<TValueOption>) =>
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

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => 
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
  
  const RenderItem = (option:ISelectOption) =>
  {
    if(option.icon)
    {
      if(typeof option.icon === 'string')
      {
        return (<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
          <img src={option.icon} width="32" height="32"/>
          <Checkbox onChange={handleChecked} value={option.value} checked={Boolean(selectedValues.indexOf(option.value as TValueOption) > -1)} />
          <span style={{paddingLeft: 8}}>{option.text}</span>
        </div>)
      }
      else
      {
        return (<>
          <ListItemIcon>
            {option.icon}
          </ListItemIcon>
          <Checkbox onChange={handleChecked} value={option.value} checked={Boolean(selectedValues.indexOf(option.value as TValueOption) > -1)} />
          <span>{option.text}</span>
        </>)        
      }
    }
    else
    {
      return (<>
        <Checkbox onChange={handleChecked} value={option.value} checked={Boolean(selectedValues.indexOf(option.value as TValueOption) > -1)} />
        <span>{option.text}</span>
      </>);
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
        <Select 
          {...props} 
          value={selectedValues} 
          multiple={true}
          renderValue={(selected) => 
          {
            return selectedTexts.join(', ');
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <RenderItem {...option}/>
            </MenuItem>
          ))}
        </Select>
        {rightElement}
      </HorizontalStack>
    </Label>);
};
