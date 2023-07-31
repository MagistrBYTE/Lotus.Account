import { createSlice } from '@reduxjs/toolkit';
import { INotificationState } from './NotificationState';
import { changeReadStatusNotificationAction, setCountNotReadNotificationsAction, setNotificationsAction } from './NotificationActions';

const initialState: INotificationState = {
};

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => 
  {
    builder.addCase(setNotificationsAction, (state, action) => 
    {
      state.notifications = action.payload;
    });

    builder.addCase(setCountNotReadNotificationsAction, (state, action) => 
    {
      state.countNotRead = action.payload;
    });

    builder.addCase(changeReadStatusNotificationAction, (state, action) => 
    {
      if(state.countNotRead)
      {
        if(action.payload)
        {
          state.countNotRead--;
        }
        else
        {
          state.countNotRead++;
        }

        if(state.notifications)
        {
          state.notifications.forEach((x)=>
          {
            if(x.id === action.payload.id)
            {
              x.isRead = action.payload.status;
            }
          })
        }
      }
    });
  }
});
