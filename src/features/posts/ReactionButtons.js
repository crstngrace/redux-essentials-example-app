import { useDispatch } from 'react-redux'
import { reactionAdded } from './postsSlice'
import { useAddReactionMutation } from '../api/apiSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch()
  const [addReaction] = useAddReactionMutation()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() =>
          // dispatch(
          //   reactionAdded({
          //     postId: post.id,
          //     reaction: name,
          //   })
          // )
          addReaction({
            postId: post.id,
            reaction: name,
          })
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  })
  return <div>{reactionButtons}</div>
}

export default ReactionButtons
