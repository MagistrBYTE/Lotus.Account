import React from 'react';
import { Chip, ChipProps } from '@mui/material';

export interface ISquareChipProps extends ChipProps
{
  label: string;
  text?: string;
}

export const SquareChip:React.FC<ISquareChipProps> = ({label, text, ...props}:ISquareChipProps) => 
{
  return <Chip label={<>{label} <b>{text}</b></>} size='small' variant='outlined' sx={{borderRadius: 1}} {...props} />
};
