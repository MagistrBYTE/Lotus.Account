import React, { useState } from 'react';
import { MenuItem, Select } from '@mui/material';
import { FilterFunctionEnum, IFilterFunctionDesc, TFilterFunction } from '../../FilterFunction';

export interface ISelectFilterFunctionProps
{
  initialFunctionFn?:IFilterFunctionDesc;
  setFilterFunction: (filterFunction: IFilterFunctionDesc)=>void;
  groupFilterFunctions: IFilterFunctionDesc[];
}

export const SelectFilterFunction: React.FC<ISelectFilterFunctionProps> = (props: ISelectFilterFunctionProps) => 
{
  const { initialFunctionFn, setFilterFunction, groupFilterFunctions } = props;

  const [selectedValue, setSelectedValue] = useState<IFilterFunctionDesc>(initialFunctionFn ?? FilterFunctionEnum.Equals);

  const handleSelectFilterFunction = (filterFn: IFilterFunctionDesc) =>
  {
    setSelectedValue(filterFn);
    setFilterFunction(filterFn);
  }

  return <Select 
    value={selectedValue} 
    {...props}
    renderValue={(selected)=>{ return selected.name}}
  >
    {groupFilterFunctions.map((option) => (
      <MenuItem key={option.id} value={option.name} onClick={()=>{handleSelectFilterFunction(option)}}>
        {(option.desc)}
      </MenuItem>
    ))}
  </Select>
};