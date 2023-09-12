import React, { ReactNode, useState } from 'react';
import { ListItemIcon, MenuItem, Select, SelectChangeEvent, SelectProps } from '@mui/material';
import { TKey } from 'src/shared/types/Key';
import { ISelectOption, getDefaulValueSelectOption, getSelectOptionText, getSelectOptionIcon } from 'src/shared/types/SelectOption';
import { ILabelProps, Label } from '../../Display/Label';
import { HorizontalStack } from '../../Layout';

export interface IOneSelectProps<TValueOption extends TKey = TKey> extends SelectProps<TValueOption>, Omit<ILabelProps, 'label'>
{
  /**
   * Список опций
   */  
  options: ISelectOption[];

  /**
   * Функция обратного вызова для установки выбранного значения
   * @param selectedValue Выбранное значение
   * @returns 
   */
  onSetSelectedValue?: (selectedValue: TValueOption)=>void;

  /**
   * Изначально выбранное значение
   */  
  initialSelectedValue?: TValueOption;

  /**
   * Дополнительный элемент справа
   */
  rightElement?: ReactNode;  
}  

export const OneSelect = <TValueOption extends TKey = TKey>({options, onSetSelectedValue, initialSelectedValue, 
  textInfo, textInfoKey, labelStyle, isTopLabel, rightElement, ...props}: IOneSelectProps<TValueOption>) =>
{
  const [selectedValue, setSelectedValue] = useState<TValueOption>(getDefaulValueSelectOption(options, initialSelectedValue));
  const [selectedText, setSelectedText] = useState<string>(getSelectOptionText(options, initialSelectedValue));
  const [selectedIcon, setSelectedIcon] = useState<ReactNode|undefined>(getSelectOptionIcon(options, initialSelectedValue));

  const handleSelect = (event: SelectChangeEvent<TValueOption>) => 
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

  const RenderItem = (option:ISelectOption) =>
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
          value={selectedValue} 
          renderValue={(selected) => 
          {
            const option = options.find((x) => x.value === selected)!;
            return <RenderItem {...option} />
          }}
          onChange={handleSelect}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <RenderItem {...option} />
            </MenuItem>
          ))}
        </Select>
        {rightElement}
      </HorizontalStack>
    </Label>);
};
