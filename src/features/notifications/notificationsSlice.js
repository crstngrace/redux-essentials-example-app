import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

const notificationAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialState = notificationAdapter.getInitialState()

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState())
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )

    return response.data
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    allNotificationsRead(state, action) {
      Object.values(state.entities).forEach((notification) => {
        notification.read = true
      })
      // state.forEach((notification) => {
      //   notification.read = true
      // })
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      notificationAdapter.upsertMany(state, action.payload)
      console.log('done')
      Object.entries(state.entities).forEach(([, notification], id) => {
        // state.entities[notification[0]].isNew = !notification.read
        notification.isNew = !notification.read
        notification.read = true
      })
      // state.push(...action.payload)
      // state.forEach((notification) => {
      //   notification.isNew = !notification.read
      // })
      // state.sort((a, b) => b.date.localeCompare(a.date))
    })
  },
})

export const { selectAll: selectAllNotifications } =
  notificationAdapter.getSelectors((state) => state.notifications)
// export const selectAllNotifications = (state) => state.notifications
export const { allNotificationsRead } = notificationsSlice.actions
export default notificationsSlice.reducer
