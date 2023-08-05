import React, { useState } from 'react';
import { AppBar, Button, Dialog, DialogActions, DialogContent, IconButton, Stack, Toolbar } from '@mui/material';
import { IPropertiesInfo } from 'src/shared/reflection/PropertiesInfo';
import { PropertyTypeEnum } from 'src/shared/reflection/PropertyType';
import { IFilterProperty } from 'src/shared/filtering/FilterProperty';
import { capitalizeFirstLetter } from 'src/core/utils/base/string';
import { localization } from 'src/shared/localization';
import CloseIcon from '@mui/icons-material/Close';
import { FilterInputText } from '../FilterInputText';
import { FilterInputNumber } from '../FilterInputNumber';

export interface IDialogFilterPanelProps
{
  open: boolean;

  close: ()=>void;

  propertiesInfo: IPropertiesInfo;

  initialFilterProperties:IFilterProperty[];

  applyFilterProperties: React.Dispatch<React.SetStateAction<IFilterProperty[]>>
}

export const DialogFilterPanel:React.FC<IDialogFilterPanelProps> = (props:IDialogFilterPanelProps) => 
{
  const { open, close, propertiesInfo, initialFilterProperties, applyFilterProperties } = props;

  const [filterProperties, setFilterProperties] = useState<IFilterProperty[]>(initialFilterProperties);

  const properties = propertiesInfo.getProperties();

  const handleSetFilterProperty = (name: string, filterProperty: IFilterProperty) =>
  {
    const newFilterProperties = [...filterProperties];

    const findFilterProperty = newFilterProperties.find((x) => x.propertyName === filterProperty.propertyName);
    if(findFilterProperty)
    {
      findFilterProperty.function = filterProperty.function;
      findFilterProperty.isSensativeCase = filterProperty.isSensativeCase;
      findFilterProperty.value = filterProperty.value;
      findFilterProperty.values = filterProperty.values;
    }
    else
    {
      newFilterProperties.push(filterProperty);
    }

    setFilterProperties(newFilterProperties);
  }

  const handleApplyFilterProperties = () =>
  {
    applyFilterProperties(filterProperties);

    close();
  }

  const handleClearFilterProperties = () =>
  {
    setFilterProperties([]);
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={close}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Stack display={'flex'} flexDirection={'column'} justifyContent={'flex-start'}>
          {
            properties.map((property, index) =>
            {
              switch(property.propertyType)
              {
                case PropertyTypeEnum.String : return <FilterInputText 
                  key={property.name} 
                  property={property} 
                  initialFilterProperty={filterProperties.find(x => x.propertyName === capitalizeFirstLetter(property.fieldName))}
                  setFilterProperty={handleSetFilterProperty} /> 
                case PropertyTypeEnum.Integer : return <FilterInputNumber key={property.name} property={property} /> 
              }

              // eslint-disable-next-line consistent-return
              return (<></>);
            })
          }
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' color='warning' onClick={handleClearFilterProperties}>{localization.actions.clear}</Button>
        <Button variant='outlined'>{localization.actions.cancel}</Button>
        <Button variant='outlined' color='primary' autoFocus onClick={handleApplyFilterProperties}>{localization.actions.confirm}</Button>
      </DialogActions>
    </Dialog>
  )
};
