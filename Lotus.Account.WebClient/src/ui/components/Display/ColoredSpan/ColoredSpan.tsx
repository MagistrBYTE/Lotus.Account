import React from 'react';
import { Box, BoxProps, Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

export interface IColoredSpanProps extends BoxProps
{
  text: string;
  variant?: Variant;
}

export const ColoredSpan:React.FC<IColoredSpanProps> = ({text, variant, ...props}:IColoredSpanProps) => 
{
  return (
    <Box
      {...props}
      component='span'
      borderRadius={2} // закругление краев (также используется значение из темы)
      border={'solid 1px'}
      display="inline-block"
    >
      <Typography variant={variant} sx={{marginLeft: 1, marginRight: 1}}>
        {text}
      </Typography>
    </Box>
  );
};
