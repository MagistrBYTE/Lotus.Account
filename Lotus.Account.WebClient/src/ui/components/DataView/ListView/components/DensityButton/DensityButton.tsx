import React, { useState } from 'react';
import { Button } from '@mui/material';
import { TPlacementDensity } from 'src/ui/types/PlacementDensity';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import DensityLargeIcon from '@mui/icons-material/DensityLarge';

export interface IDensityButtonProps
{
  /**
   * Функция обратного вызова для установки выбранной плотности
   * @param sort 
   * @returns 
   */
  onSetPlacementDensity: (density: TPlacementDensity)=>void;

  /**
   * Изначальное значение плотности
   */
  initialDensity:TPlacementDensity;  
}

export const DensityButton: React.FC<IDensityButtonProps> = (props:IDensityButtonProps) => 
{
  const { onSetPlacementDensity, initialDensity } = props;

  const [density, setDensity] = useState<TPlacementDensity>(initialDensity);

  const handleSetDensity = () =>
  {
    if(density === TPlacementDensity.Density)
    {
      setDensity(TPlacementDensity.Normal);
      onSetPlacementDensity(TPlacementDensity.Normal);
      return;
    }

    if(density === TPlacementDensity.Normal)
    {
      setDensity(TPlacementDensity.Spacious);
      onSetPlacementDensity(TPlacementDensity.Spacious);
      return;
    }

    if(density === TPlacementDensity.Spacious)
    {
      setDensity(TPlacementDensity.Density);
      onSetPlacementDensity(TPlacementDensity.Density);
    }    
  }

  const getIcon = () =>
  {
    switch(density)
    {
      case TPlacementDensity.Density: return <DensitySmallIcon/>
      case TPlacementDensity.Normal: return <DensityMediumIcon/>
      case TPlacementDensity.Spacious: return <DensityLargeIcon/>
    }

    return <></>
  }

  return (
    <Button variant='outlined' size='large' onClick={handleSetDensity}
      startIcon={getIcon()} />
  )
};
