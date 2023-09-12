import React, { ReactNode, useState } from 'react';
import { Button, ButtonProps, MenuItem, Popover, Slider } from '@mui/material';
import { IImageSource, ImageDatabase } from 'src/resources/image';
import { ILabelProps, Label } from '../../Display/Label';
import { HorizontalStack } from '../../Layout';

export interface IImageGalleryProps extends ButtonProps, ILabelProps
{
  /**
   * Список изображений
   */  
  images: IImageSource[];

  /**
   * Функция обратного вызова для установки выбранного значения
   * @param selectedValue Выбранный идентификатор изображения
   * @returns 
   */
  onSetSelectedValue?: (selectedValue: number)=>void;

  /**
   * Функция обратного вызова для установки выбранного изображения
   * @param selectedValue Выбранное изображение
   * @returns 
   */
  onSetSelectedImage?: (selectedImage: IImageSource)=>void;  

  /**
   * Изначально выбранное значение
   */  
  initialSelectedValue?: number;

  /**
   * Дополнительный элемент справа
   */
  rightElement?: ReactNode;  
}  

export const ImageGallery: React.FC<IImageGalleryProps> = ({images, onSetSelectedValue, onSetSelectedImage, initialSelectedValue,
  textInfo, textInfoKey, labelStyle, isTopLabel, rightElement, ...props}: IImageGalleryProps) =>
{
  const [selectedValue, setSelectedValue] = useState<IImageSource|undefined>(ImageDatabase.getImageById(initialSelectedValue))
  const [anchorElem, setAnchorElem] = useState<HTMLButtonElement | null>(null);
  const [sizeImage, setSizeImage] = useState<number>(32);

  const open = Boolean(anchorElem);
  const id = open ? 'popover-gallery-elements' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => 
  {
    event.preventDefault();
    if (anchorElem === null) 
    {
      setAnchorElem(event.currentTarget)
    } 
    else 
    {
      setAnchorElem(null)
    }
  };

  const handleClose = () => 
  {
    setAnchorElem(null);
  };

  const handleSelect = (image:IImageSource) =>
  {
    setSelectedValue(image);
    if(onSetSelectedValue)
    {
      onSetSelectedValue(image.id);
    }
    if(onSetSelectedImage)
    {
      onSetSelectedImage(image);
    }
    setAnchorElem(null);
  }

  const handleChangeSizeImage = (event: Event, value: number | number[], activeThumb: number) => 
  {
    setSizeImage(value as number);
  };  

  const RenderItem = (image:IImageSource) =>
  {
    return (
      <MenuItem onClick={() =>{handleSelect(image)}}>
        <img style={{margin: 2}} src={image.source} width={sizeImage} height={sizeImage}/>
      </MenuItem>)
  }

  return (
    <Label
      label={props.label}
      labelStyle={labelStyle}
      isTopLabel={isTopLabel}
      fullWidth={props.fullWidth} 
      textInfo={textInfo} 
      textInfoKey={textInfoKey} >
      <HorizontalStack fullWidth>
        <Button {...props} aria-describedby={id} onClick={handleClick}>
          {selectedValue && 
        <>
          <img style={{margin: 2}} src={selectedValue.source} width={sizeImage} height={sizeImage}/>
          <span>{selectedValue.name}</span>
        </>
          }
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorElem}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          <div style={{ width: '400px', height: '300x', overflow: 'clip' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
              {
                images.map((x, index) =>
                {
                  return <RenderItem key={index} {...x} />
                })
              }
            </div>
          </div>
          <Slider min={24} max={64} value={sizeImage} onChange={handleChangeSizeImage} />
        </Popover>
        {rightElement}
      </HorizontalStack>
    </Label>);  
};
