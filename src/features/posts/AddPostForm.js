import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded, addNewPost } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'
import { useAddNewPostMutation } from '../api/apiSlice'

const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  // const [addRequestStatus, setAddRequestStatus] = useState('idle')

  // const dispatch = useDispatch()
  const [addNewPost, { isLoading }] = useAddNewPostMutation({
    title,
    content,
    user: userId,
  })
  const users = useSelector(selectAllUsers)

  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)
  const onAuthorChange = (e) => setUserId(e.target.value)

  const canSave = [title, content, userId].every(Boolean) && !isLoading

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        // setAddRequestStatus('pending')
        // await dispatch(
        //   addNewPost({
        //     title,
        //     content,
        //     user: userId,
        //   })
        // ).unwrap()
        await addNewPost({ title, content, user: userId }).unwrap()

        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.log('error')
      } finally {
        // setAddRequestStatus('idle')
      }
    }
  }

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          name="postAuthor"
          value={userId}
          onChange={onAuthorChange}
        >
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />

        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
