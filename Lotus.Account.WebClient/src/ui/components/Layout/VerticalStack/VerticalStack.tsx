import { Stack, StackProps } from '@mui/material';
import React, {  } from 'react';

export interface IVerticalStackProps extends StackProps
{
}

export const VerticalStack: React.FC<IVerticalStackProps> = (props:IVerticalStackProps) => 
{
  const justifyContent = props.justifyContent ?? 'flex-start';
  const alignItems = props.alignItems ?? 'start';
  return (
    <Stack {...props} display={'flex'} flexDirection={'column'} justifyContent={justifyContent} alignItems={alignItems} >
      {props.children}
    </Stack>
  );
};