import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      //   providesTags: ['Post'],
      providesTags: (result = [], error, arg) => [
        'Post',
        ...result.map(({ id }) => ({ type: 'Post', id })),
      ],
    }),
    getPost: builder.query({
      query: (postId) => `/posts/${postId}`,
      providesTags: (result, error, arg) => [{ type: 'Post', id: arg }],
    }),
    addNewPost: builder.mutation({
      query: (initalPost) => ({
        url: '/posts',
        method: 'POST',
        body: initalPost,
      }),
      invalidatesTags: ['Post'],
    }),
    editPost: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'PATCH',
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
    }),
    // getUsers: builder.query({
    //   query: () => '/users',
    // }),
    addReaction: builder.mutation({
      query: ({ postId, reaction }) => ({
        url: `posts/${postId}/reactions`,
        method: 'POST',
        body: { reaction },
      }),
      // invalidatesTags: (result, error, arg) => [
      //   { type: 'Post', id: arg.postId },
      // ],
      async onQueryStarted({ postId, reaction }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getPosts', undefined, (draft) => {
            const post = draft.find((post) => post.id === postId)

            if (post) {
              post.reactions[reaction]++
            }
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
  }),
})

console.log('apiSlice', apiSlice)
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
  // useGetUsersQuery,
  useAddReactionMutation,
} = apiSlice
