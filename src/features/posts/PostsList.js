import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import {
  fetchPosts,
  selectAllPosts,
  selectPostIds,
  selectPostById,
} from './postsSlice'
import { Spinner } from '../../components/Spinner'
import PostAuthor from './PostAuthor'
import ReactionButtons from './ReactionButtons'
import TimeAgo from './TimeAgo'

import { useGetPostsQuery } from '../api/apiSlice'

// const PostExcerpt = React.memo(({ post }) => {})
// const PostExcerpt = ({ postId }) => {
// const post = useSelector((state) => selectPostById(state, postId))
const PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

const PostsList = () => {
  const dispatch = useDispatch()
  // const posts = useSelector(selectAllPosts)
  // const orderedPostIds = useSelector(selectPostIds)
  // const postStatus = useSelector((state) => state.posts.status)
  // const error = useSelector((state) => state.posts.error)

  // useEffect(() => {
  //   if (postStatus === 'idle') {
  //     dispatch(fetchPosts())
  //   }
  // }, [postStatus, dispatch])

  const {
    data: posts = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetPostsQuery()

  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice()
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
    return sortedPosts
  }, [posts])

  let content

  if (isLoading) {
    content = <Spinner text="loading..." />
  } else if (isSuccess) {
    // const orderedPosts = posts
    //   .slice()
    //   .sort((a, b) => b.date.localeCompare(a.date))

    // content = orderedPosts?.map((post) => (
    //   <PostExcerpt key={post.id} post={post} />
    // ))
    // content = orderedPostIds.map((postId) => (
    //   <PostExcerpt key={postId} postId={postId} />
    // ))
    const renderedPosts = sortedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ))

    const containerClassName = classnames('posts-container', {
      disabled: isFetching,
    })

    content = <div className={containerClassName}>{renderedPosts}</div>
  } else if (isError) {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      <button onClick={refetch}>Refetch Posts</button>
      {content}
    </section>
  )
}

export default PostsList
