import React, { useState } from 'react';
import { MenuItem, Select } from '@mui/material';
import { FilterFunctionEnum, FilterFunctionHelper, IFilterFunctionDesc, TFilterFunction } from '../../FilterFunction';

export interface ISelectFilterFunctionProps
{
  initialFunctionFn?:IFilterFunctionDesc;
  setFilterFunction: (filterFunction: IFilterFunctionDesc)=>void;
  groupFilterFunctions: IFilterFunctionDesc[];
}

export const SelectFilterFunction: React.FC<ISelectFilterFunctionProps> = (props: ISelectFilterFunctionProps) => 
{
  const { initialFunctionFn, setFilterFunction, groupFilterFunctions } = props;

  const [selectedValue, setSelectedValue] = useState<string>(initialFunctionFn?.name ?? FilterFunctionEnum.Contains.name);

  const handleSelectFilterFunction = (filterFn: IFilterFunctionDesc) =>
  {
    setSelectedValue(filterFn.name);
    setFilterFunction(filterFn);
  }

  return <Select 
    value={selectedValue} 
    renderValue={(selected)=>{ return FilterFunctionHelper.getDescByName(selected).desc}}
  >
    {groupFilterFunctions.map((option) => (
      <MenuItem key={option.id} value={option.name} onClick={()=>{handleSelectFilterFunction(option)}}>
        {(option.desc)}
      </MenuItem>
    ))}
  </Select>
};