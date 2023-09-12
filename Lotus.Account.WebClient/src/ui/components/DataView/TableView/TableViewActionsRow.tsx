import { IconButton, MenuItem, Tooltip } from '@mui/material';
import { Cancel, Delete, Edit, Save } from '@mui/icons-material';
import { MRT_Cell, MRT_FilterOption, MRT_Row, MRT_TableInstance } from 'material-react-table';
import React from 'react';
import { localization } from 'src/resources/localization';

export interface IActionRowProps<TItem extends Record<string, any>>
{
  cell: MRT_Cell<TItem>;
  table: MRT_TableInstance<TItem>;
  row: MRT_Row<TItem>;
}

export interface IEditActionRowProps<TItem extends Record<string, any>> extends IActionRowProps<TItem>
{
  onEditRow: (table: MRT_TableInstance<TItem>, row: MRT_Row<TItem>) => void;
}

export const EditActionRow = <TItem extends Record<string, any>>(props: IEditActionRowProps<TItem>):React.ReactNode =>
{
  const {cell, table, row, onEditRow} = props;

  return (<Tooltip arrow placement="left" title={localization.actions.edit}>
    <IconButton size='large' onClick={() => { props.onEditRow(table, row) }}>
      <Edit />
    </IconButton>
  </Tooltip>)
}
