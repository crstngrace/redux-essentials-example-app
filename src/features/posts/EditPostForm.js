import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { postUpdated, selectPostById } from './postsSlice'
import { useGetPostQuery, useEditPostMutation } from '../api/apiSlice'

const EditPostForm = ({ match }) => {
  const { postId } = match.params
  // const post = useSelector((state) => selectPostById(state, postId))
  const { data: post } = useGetPostQuery(postId)
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  // const dispatch = useDispatch()
  const history = useHistory()
  const [editPost, { isLoading }] = useEditPostMutation(post)

  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)

  const onSavePostClicked = async () => {
    if (title && content) {
      // dispatch(
      //   postUpdated({
      //     id: postId,
      //     title,
      //     content,
      //   })
      // )
      await editPost({
        id: postId,
        title,
        content,
      })
      history.push(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />

        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  )
}

export default EditPostForm
