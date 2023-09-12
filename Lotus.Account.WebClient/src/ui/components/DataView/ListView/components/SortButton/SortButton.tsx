import React, { useState } from 'react';
import { Button, Badge, Menu, MenuItem, IconButton, Popover } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAmountAsc, faSortAmountDesc} from '@fortawesome/free-solid-svg-icons'
import { IconButtonAwesome } from 'src/ui/components/Display';
import { IObjectInfo } from 'src/shared/objectInfo/ObjectInfo';
import { ISortProperty } from 'src/shared/types/Sorting';
import { capitalizeFirstLetter } from 'src/shared/utils/base/string';

export interface ISortButtonProps
{
  /**
   * Свойства объекта
   */
  objectInfo: IObjectInfo;

  /**
   * Функция обратного вызова для установки выбранной сортировки
   * @param sort 
   * @returns 
   */
  onSetSortProperties: (sort: ISortProperty[])=>void;

  /**
   * Изначальное значение сортировки
   */
  initialSortProperties:ISortProperty[];  
}

export const SortButton: React.FC<ISortButtonProps> = (props:ISortButtonProps) => 
{
  const { objectInfo, onSetSortProperties, initialSortProperties } = props;

  const [sortProperties, setSortProperties] = useState<ISortProperty[]>(initialSortProperties);
  const [isSortStatus, setIsSortStatus] = useState<boolean>(initialSortProperties.length === 0);
  const [anchorElem, setAnchorElem] = React.useState<null | HTMLElement>(null);
  const menuIdSort = 'sort-listview-menu';
  const isMenuOpen = Boolean(anchorElem);

  const properties = objectInfo.getPropertiesSorted();

  //
  // Сортировка
  //  
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => 
  {
    setAnchorElem(event.currentTarget);
  }

  const handleCloseMenu = () => 
  {
    setAnchorElem(null);
  }  

  const handleSetSortProperty = (fieldName: string, isDesc: boolean) =>
  {
    const sortProperty:ISortProperty = {propertyName: capitalizeFirstLetter(fieldName), isDesc};
    const newSortProperties = [sortProperty];
    setSortProperties(newSortProperties);
    setIsSortStatus(true);

    onSetSortProperties(newSortProperties);
    setAnchorElem(null);
  }
  
  const isSelected =(fieldName:string, isDesc:boolean) =>
  {
    if(sortProperties.length === 0) return false;
    return (capitalizeFirstLetter(fieldName) === sortProperties[0].propertyName && sortProperties[0].isDesc === isDesc);
  }

  return (
    <>
      <Button variant='outlined' size='large' onClick={handleOpenMenu}
        startIcon=
          {
            <Badge variant="dot" color="success" invisible={!isSortStatus}>
              <SortIcon/>
            </Badge>
          } />
      <Menu 
        anchorEl={anchorElem}
        id={menuIdSort}
        keepMounted
        open={isMenuOpen}
        onClose={handleCloseMenu}>
        {
          properties.map((x, index) =>
          {
            return <div key={index} style={{display: 'grid', 
              gridTemplateColumns: '30% auto *', 
              justifyContent: 'start', 
              alignItems: 'center',
              margin: 4}}>
              {x.name}
              <IconButtonAwesome 
                sx={{margin: 0.5}} 
                isBorder 
                isSelected={isSelected(x.fieldName, false)}
                awesomeIcon={faSortAmountAsc} 
                onClick={()=>{handleSetSortProperty(x.fieldName, false)}}/>
              <IconButtonAwesome 
                sx={{margin: 0.5}} 
                isBorder 
                isSelected = {isSelected(x.fieldName, true)} 
                awesomeIcon={faSortAmountDesc}  
                onClick={()=>{handleSetSortProperty(x.fieldName, true)}}/>
            </div>
          })
        }
      </Menu>
    </>
  )
};
