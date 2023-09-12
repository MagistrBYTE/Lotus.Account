import React, { useState } from 'react';
import { IconButton, Popover, Typography } from '@mui/material';
import { IInformationData } from 'src/ui/types/InformationData';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export interface IInfoIconProps extends IInformationData
{
}

export const InfoIcon:React.FC<IInfoIconProps> = ({textInfo}:IInfoIconProps) => 
{
  const [anchorElemInfo, setAnchorElemInfo] = React.useState<HTMLButtonElement|null>(null);
  const [openInfo, setOpenInfo] = useState<boolean>(false);

  const handleOpenInfo = (event: React.MouseEvent<HTMLButtonElement>) => 
  {
    setOpenInfo(true);
    setAnchorElemInfo(event.currentTarget);
  };

  const handleCloseInfo = () => 
  {
    setOpenInfo(false);
    setAnchorElemInfo(null);
  };  

  {textInfo && <>
    <IconButton onClick={handleOpenInfo}>
      <HelpOutlineIcon />
    </IconButton>
    <Popover
      open={openInfo}
      anchorEl={anchorElemInfo}
      onClose={handleCloseInfo}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
    >
      <Typography sx={{ p: 1 }}>{textInfo}</Typography>
    </Popover>
  </>}

  return <></>;
}