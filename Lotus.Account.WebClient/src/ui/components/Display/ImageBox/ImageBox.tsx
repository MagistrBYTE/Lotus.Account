import React from 'react';
import { Box } from '@mui/material';
import { ImageDatabase } from 'src/resources/image';

export interface IImageBoxProps
{
  id?: number;
}

export const ImageBox:React.FC<IImageBoxProps> = ({id, ...props}:IImageBoxProps) => 
{
  return <Box 
    sx={{display: 'flex', alignItems: 'center', gap: '1rem' }}>
    <img
      alt="avatar"
      height={32}
      width={32}
      src={ImageDatabase.getImageById(id)?.source}
      loading="lazy"
      style={{ borderRadius: '50%' }}
    />
  </Box>
};
