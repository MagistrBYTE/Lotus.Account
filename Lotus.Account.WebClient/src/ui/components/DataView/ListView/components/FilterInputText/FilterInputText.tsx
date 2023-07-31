import React, { ChangeEvent, useState } from 'react';
import { IconButton, Popover, Stack, TextField, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { IPropertyDescriptor } from 'src/shared/reflection/PropertyDescriptor';
import { FilterFunctionEnum, IFilterFunctionDesc } from 'src/shared/filtering/FilterFunction';
import { SelectFilterFunction } from 'src/shared/filtering/ui/SelectFilterFunction';
import { GroupFilterFunctionString } from 'src/shared/filtering/GroupFilterFunction';

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
}

export const FilterInputText:React.FC<IFilterInputTextProps> = (props:IFilterInputTextProps) => 
{
  const { textInfo, property } = props;

  const [anchorElemInfo, setAnchorElemInfo] = React.useState<HTMLButtonElement | null>(null);
  const [openInfo, setOpenInfo] = useState<boolean>(false);

  const [filterValue, setFilterValue] = useState<string|null>(); 
  const [filterFunction, setFilterFunction] = useState<IFilterFunctionDesc>(FilterFunctionEnum.Equals); 

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
    setFilterValue(event.target.value)
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
        <SelectFilterFunction groupFilterFunctions={GroupFilterFunctionString}
          setFilterFunction={setFilterFunction}/>
      </Stack>
    </Stack>
  )
};
