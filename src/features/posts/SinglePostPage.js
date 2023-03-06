import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'
import { Spinner } from '../../components/Spinner'
import { useGetPostQuery } from '../api/apiSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

const SinglePostPage = ({ match }) => {
  const { postId } = match.params

  // const post = useSelector((state) => selectPostById(state, postId))
  const { data: post, isFetching, isSuccess, isError } = useGetPostQuery(postId)

  let content

  if (isFetching) {
    content = <Spinner text="Loading..." />
  } else if (isError) {
    content = <h2>Post not found</h2>
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post.title}</h2>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    )
  }

  return <section>{content}</section>
}

export default SinglePostPage
