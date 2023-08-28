import { Button, Slider } from '@mui/material';
import React, { ChangeEvent, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

export interface IImageEditorProps 
{
  width?: number;
  height?: number;
}

export const ImageEditor: React.FC<IImageEditorProps> = (props: IImageEditorProps) => 
{
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState('https://api.dicebear.com/6.x/miniavs/svg?seed=Spooky');

  const [scale, setScale] = useState(1.0);
  const [border, setBorder] = useState(0);
  const [borderRadius, setBorderRadius] = useState(2);

  const editor = useRef(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => 
  {
    if (event.target.files) 
    {
      setFile(event.target.files[0]);
    }
  };

  const handleBlobSave = (blob: Blob | null) => 
  {
    console.log(blob);
  }

  const handleFileSave = () => 
  {
    if (editor) 
    {
      const canvas = (editor!.current! as any).getImage() as HTMLCanvasElement;
      canvas.toBlob(handleBlobSave);
      console.log(canvas);
    }
  };

  const handleBorderRadiusChange = (event: Event, value: number | number[], activeThumb: number) =>
  {
    setBorderRadius(value as number);
  }

  return <>
    <AvatarEditor
      ref={editor}
      image={file ?? image}
      width={props.width ?? 150}
      height={props.height ?? 150}
      border={border}
      scale={scale}
      borderRadius={borderRadius}
    />
    {file && <Slider min={0} max={60} value={borderRadius} onChange={handleBorderRadiusChange} />}
    <Button variant="contained" component="label">
      Upload
      <input hidden accept="image/*" type="file" onChange={handleFileChange} />
    </Button>
    {file && <Button onClick={handleFileSave}>Сохранить</Button>}
    {file && <Button onClick={handleFileSave}>Удалить</Button>}
  </>
};
