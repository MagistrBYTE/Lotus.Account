import { MenuItem } from '@mui/material';
import { MRT_FilterOption } from 'material-react-table';
import React from 'react';
import { localization } from 'src/shared/localization';


export const EditTableFilterString = (column: any, onSelectFilterMode: (filterMode: MRT_FilterOption) => void):React.ReactNode[] =>
{
  return [        
    <MenuItem
      key='stringContains'
      onClick={() => {onSelectFilterMode('contains'); column.filterFn = 'contains'}}>
      {localization.filtres.contains}
    </MenuItem>,
    <MenuItem
      key="stringEquals"
      onClick={() => onSelectFilterMode('equals')}>
      {localization.filtres.equals}
    </MenuItem>,
    <MenuItem
      key="stringStartsWith"
      onClick={() => onSelectFilterMode('startsWith')}>
      {localization.filtres.startsWith}
    </MenuItem>,
    <MenuItem
      key="stringEndsWith"
      onClick={() => onSelectFilterMode('endsWith')}>
      {localization.filtres.endsWith}
    </MenuItem>,
    <MenuItem
      key="stringNotEquals"
      onClick={() => onSelectFilterMode('notEquals')}>
      {localization.filtres.notEqual}
    </MenuItem>,          
    <MenuItem
      key="stringNotEmpty"
      onClick={() => onSelectFilterMode('notEmpty')}>
      {localization.filtres.notEmpty}
    </MenuItem> ]
}

export const EditTableFilterEnum = (column: any, onSelectFilterMode: (filterMode: MRT_FilterOption) => void):React.ReactNode[] =>
{
  return [        
    <MenuItem
      key={'includeAny'}
      onClick={() => {onSelectFilterMode('includeAny');}}>
      {localization.filtres.includeAny}
    </MenuItem>,
    <MenuItem
      key={'includeAll'}
      onClick={() => {onSelectFilterMode('includeAll');}}>
      {localization.filtres.includeAll}
    </MenuItem>,
    <MenuItem
      key={'includeEquals'}
      onClick={() => {onSelectFilterMode('includeEquals');}}>
      {localization.filtres.includeEquals}
    </MenuItem>,
    <MenuItem
      key={'includeNone'}
      onClick={() => {onSelectFilterMode('includeNone');}}>
      {localization.filtres.includeNone}
    </MenuItem>]
} 
