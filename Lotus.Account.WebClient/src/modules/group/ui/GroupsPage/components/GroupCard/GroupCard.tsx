import { Card, CardHeader } from '@mui/material';
import React from 'react';
import { IGroup } from 'src/modules/group/domain/Group';

export const GroupCard: React.FC<IGroup> = ({id, name, shortName}:IGroup) => 
{
  return (
    <Card sx={{ minWidth: 280, margin: 2 }}>
      <CardHeader title={name} subheader={shortName} />
    </Card>
  );
};