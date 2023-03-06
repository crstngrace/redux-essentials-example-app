import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'
import { selectUserById } from './usersSlice'
import { selectAllPosts, selectPostsByUser } from '../posts/postsSlice'
import { useGetPostsQuery } from '../api/apiSlice'
import { useMemo } from 'react'

const UserPage = ({ match }) => {
  const { userId } = match.params
  const user = useSelector((state) => selectUserById(state, userId))

  const selectPostsForUser = useMemo(() => {
    const emptyArray = []

    return createSelector(
      (res) => res.data,
      (res, userId) => userId,
      (data, userId) =>
        data?.filter((post) => post.user === userId) ?? emptyArray
    )
  }, [])
  // const dt = useGetPostsQuery()
  // const res = selectPostsForUser(dt, userId)
  // const postsForUser = useSelector((state) => selectPostsByUser(state, userId))
  const { postsForUser } = useGetPostsQuery(undefined, {
    selectFromResult: (result) => ({
      postsForUser: selectPostsForUser(result, userId),
    }),
  })
  // See Dev Tools Profiler - If this is not commented (Go to User Page, Start Profiling, and Click Refresh Notifications)
  // You will see tha UserPage rerendered because useSelector will re-run every time an action is dispatched.. filter is returning new array reference even posts doesnot change
  // const postsForUser = useSelector((state) => {
  // const allPosts = selectAllPosts(state)

  // return allPosts.filter((post) => post.user === userId)
  // })

  const postTitles = postsForUser?.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>{postTitles}</ul>
    </section>
  )
}

export default UserPage
