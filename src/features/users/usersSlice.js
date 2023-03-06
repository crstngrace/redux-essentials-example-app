import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'
import { apiSlice } from '../api/apiSlice'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

/* export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchUsers.fulfilled,
      usersAdapter.setAll
      // (state, action) => {
      // return action.payload
      // }
    )
  },
})
*/
// export const selectAllUsers = (state) => state.users
// export const selectUserById = (state, userId) =>
//   state.users.find((user) => user.id === userId)

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: (responseData) => {
        return usersAdapter.setAll(initialState, responseData)
      },
    }),
  }),
})

export const selectUsersResult = apiSlice.endpoints.getUsers.select()

/*const emptyUsers = []

export const selectAllUsers = createSelector(
  selectUsersResult,
  (usersResult) => usersResult?.data ?? emptyUsers
)

export const selectUserById = createSelector(
  selectAllUsers,
  (state, userId) => userId,
  (users, userId) => users.find((user) => user.id === userId)
)*/

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
)

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState)
export const { useGetUsersQuery } = extendedApiSlice
// export default usersSlice.reducer
