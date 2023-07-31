import React from 'react';
import { Container, Pagination, Paper, Stack } from '@mui/material';
import { useLayoutState } from 'src/shared/layout';
import { mockNotificationsGroupByDate } from '../../mock/NotificationMock';
import { NotificationGroup } from './components/NotificationGroup';

export const NotificationsPage: React.FC = () => 
{
  const data = mockNotificationsGroupByDate(6, 2, 8);

  const notifications = data.flatMap(x => x.notifications);

  const footerState = useLayoutState().footer;

  const isFooter = footerState.isVisible && footerState.isCollapsed === false;
  const marginBottom = isFooter ? footerState.height + 30 : 30;
  return (
    <Container maxWidth={'md'}>
      <Paper elevation={1} square>
        {
          data.map((x, index)=>
          {
            return <NotificationGroup key={index} {...x} />
          })
        }
      </Paper>
      <Stack display={'flex'} flexDirection={'row'} justifyContent={'center'} >
        <Pagination size='large' sx={{marginBottom: `${marginBottom}px`}} count={10} shape="rounded" />
      </Stack>
    </Container>
  );
};