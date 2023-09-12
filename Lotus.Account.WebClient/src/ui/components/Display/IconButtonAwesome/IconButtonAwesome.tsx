import React from 'react';
import { IconButton, IconButtonProps, SxProps, Theme, useTheme } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IIconButtonAwesomesProps extends IconButtonProps
{
  isBorder?: boolean;

  isSelected?: boolean;

  awesomeIcon: any;

  colorIcon?: string;
}

export const IconButtonAwesome:React.FC<IIconButtonAwesomesProps> = ({isBorder, isSelected, awesomeIcon, colorIcon,...props}:IIconButtonAwesomesProps) => 
{
  const theme = useTheme();

  const selectedColor = theme.palette.primary.main;
  const infoColor = theme.palette.grey[700];

  const getSx = ():SxProps<Theme>|undefined =>
  {
    if(isBorder && isSelected)
    {
      const sx:SxProps<Theme> = {...props.sx, borderColor: selectedColor, borderWidth: 2, borderStyle: 'solid', borderRadius: '10%'}
      return sx;
    }
    else
    {
      if(isBorder)
      {
        const sx:SxProps<Theme> = {...props.sx, borderColor: infoColor, borderWidth: 1, borderStyle: 'solid', borderRadius: '10%'}
        return sx;
      }
      else
      {
        return props.sx;
      }
    } 
  }

  return (
    <IconButton {...props} sx={getSx()} >
      <FontAwesomeIcon color={colorIcon} icon={awesomeIcon} />
    </IconButton>
  );
};
