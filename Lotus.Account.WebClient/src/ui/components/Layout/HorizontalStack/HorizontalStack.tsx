import { Stack, StackProps } from '@mui/material';
import React, {  } from 'react';

export interface IHorizontalStackProps extends StackProps
{
}

export const HorizontalStack: React.FC<IHorizontalStackProps> = (props:IHorizontalStackProps) => 
{
  const justifyContent = props.justifyContent ?? 'flex-start';
  const alignItems = props.alignItems ?? 'start';
  return (
    <Stack {...props} display={'flex'} flexDirection={'row'} justifyContent={justifyContent} alignItems={alignItems} >
      {props.children}
    </Stack>
  );
};