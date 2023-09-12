import { Stack, StackProps } from '@mui/material';
import React, {  } from 'react';

export interface IHorizontalStackProps extends StackProps
{
  /**
   * 100% ширина
   */  
  fullWidth?: boolean;
}

export const HorizontalStack: React.FC<IHorizontalStackProps> = ({fullWidth, ...props}:IHorizontalStackProps) => 
{
  const justifyContent = props.justifyContent ?? 'flex-start';
  const alignItems = props.alignItems ?? 'start';
  const sx = fullWidth === true ? props.sx ?? {width:'100%'} : {...props.sx, width:'100%'};
  return (
    <Stack {...props} display={'flex'} flexDirection={'row'} justifyContent={justifyContent} alignItems={alignItems} sx={sx}>
      {props.children}
    </Stack>
  );
};