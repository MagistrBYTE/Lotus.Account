import { createSlice } from '@reduxjs/toolkit';
import { IUserNotificationState } from './UserNotificationState';
import { changeReadStatusUserNotificationAction, setCountNotReadUserNotificationsAction, setUserNotificationsAction } from './UserNotificationActions';

const initialState: IUserNotificationState = {
};

export const userNotificationSlice = createSlice({
  name: 'userNotification',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => 
  {
    builder.addCase(setUserNotificationsAction, (state, action) => 
    {
      state.notifications = action.payload;
    });

    builder.addCase(setCountNotReadUserNotificationsAction, (state, action) => 
    {
      state.countNotRead = action.payload;
    });

    builder.addCase(changeReadStatusUserNotificationAction, (state, action) => 
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
