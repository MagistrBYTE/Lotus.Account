import { Card, CardHeader } from '@mui/material';
import React from 'react';
import { IUserGroup } from 'src/modules/admin/user-group';

export const UserGroupCard: React.FC<IUserGroup> = ({id, name, displayName}:IUserGroup) => 
{
  return (
    <Card sx={{ minWidth: 280, margin: 2 }}>
      <CardHeader title={name} subheader={displayName} />
    </Card>
  );
};