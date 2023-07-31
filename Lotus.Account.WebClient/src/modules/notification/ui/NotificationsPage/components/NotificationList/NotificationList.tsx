import React, { useState } from 'react';
import { Container, Pagination, Paper, Stack } from '@mui/material';
import { mockNotificationsGroupByDate } from 'src/modules/notification/mock/NotificationMock';
import { useLayoutState } from 'src/shared/layout';
import { NotificationGroup } from '../NotificationGroup';

export const NotificationList: React.FC = () => 
{
  const [pageIndex, setPageIndex] = useState(0);

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
        <Pagination size='large' sx={{marginBottom: `${marginBottom}px`}} count={10} page={pageIndex} shape="rounded" />
      </Stack>
    </Container>
  );
};