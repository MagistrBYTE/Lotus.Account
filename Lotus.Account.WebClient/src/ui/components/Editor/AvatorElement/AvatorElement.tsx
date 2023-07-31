import { Button } from '@mui/material';
import React, { ChangeEvent, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

export interface IAvatorElementProps 
{

}

export const AvatorElement: React.FC<IAvatorElementProps> = (props: IAvatorElementProps) => 
{
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState('http://example.com/initialimage.jpg');
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

  return <>
    <AvatarEditor
      ref={editor}
      image={file ?? image}
      width={250}
      height={250}
      border={50}
      scale={1.2}
    />
    <Button variant="contained" component="label">
      Upload
      <input hidden accept="image/*" type="file" onChange={handleFileChange} />
    </Button>
    <Button onClick={handleFileSave}>Сохранить</Button>
  </>
};
