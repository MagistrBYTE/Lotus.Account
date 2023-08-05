import React, { ChangeEvent, useState } from 'react';
import { BaseTextFieldProps, IconButton, Popover, Stack, TextField, TextFieldProps, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { IPropertyDescriptor } from 'src/shared/reflection/PropertyDescriptor';
import { FilterFunctionEnum, IFilterFunctionDesc } from 'src/shared/filtering/FilterFunction';
import { SelectFilterFunction } from 'src/shared/filtering/ui/SelectFilterFunction';
import { GroupFilterFunctionString } from 'src/shared/filtering/GroupFilterFunction';
import { IFilterProperty } from 'src/shared/filtering/FilterProperty';
import { capitalizeFirstLetter } from 'src/core/utils/base/string';

export interface IFilterInputTextProps
{
  /**
   * Дополнительное описание
   */
  textInfo?: string;  
  
  /**
   * Дескриптор свойства по которому идет фильтрация
   */
  property: IPropertyDescriptor;

  initialFilterProperty?:IFilterProperty;

  setFilterProperty: (name: string, filterProperty: IFilterProperty) => void;
}

export const FilterInputText:React.FC<IFilterInputTextProps> = (props:IFilterInputTextProps) => 
{
  const { textInfo, property, initialFilterProperty, setFilterProperty } = props;

  const [anchorElemInfo, setAnchorElemInfo] = React.useState<HTMLButtonElement | null>(null);
  const [openInfo, setOpenInfo] = useState<boolean>(false);

  const [filterValue, setFilterValue] = useState<string|undefined>(initialFilterProperty === undefined ? undefined : initialFilterProperty.value); 
  const [filterFunction, setFilterFunction] = useState<IFilterFunctionDesc>(initialFilterProperty === undefined ? FilterFunctionEnum.Contains : initialFilterProperty.function); 

  const handleOpenInfo = (event: React.MouseEvent<HTMLButtonElement>) => 
  {
    setOpenInfo(true);
    setAnchorElemInfo(event.currentTarget);
  };

  const handleCloseInfo = () => 
  {
    setOpenInfo(false);
    setAnchorElemInfo(null);
  };

  const handleFilterValue = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => 
  {
    setFilterValue(event.target.value);

    const filterProperty: IFilterProperty =
    {
      propertyName: capitalizeFirstLetter(property.fieldName),
      function: filterFunction,
      propertyType: property.propertyType,
      isArray: property.isArray,
      value: filterValue
    };

    setFilterProperty(property.fieldName, filterProperty);
  };

  return (
    <Stack display={'flex'} flexDirection={'column'} justifyContent={'flex-start'}>
      <Stack display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'}>
        <Typography variant='h6'>{property.name}</Typography>
        {textInfo && <>
          <IconButton onClick={handleOpenInfo}>
            <HelpOutlineIcon />
          </IconButton>
          <Popover
            open={openInfo}
            anchorEl={anchorElemInfo}
            onClose={handleCloseInfo}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
          >
            <Typography sx={{ p: 1 }}>{textInfo}</Typography>
          </Popover>
        </>
        }
      </Stack>
      <Stack display={'flex'} flexDirection={'row'} justifyContent={'flex-start'}>
        <TextField value={filterValue} onChange={handleFilterValue} />
        <SelectFilterFunction
          groupFilterFunctions={GroupFilterFunctionString}
          setFilterFunction={setFilterFunction}/>
      </Stack>
    </Stack>
  )
};
