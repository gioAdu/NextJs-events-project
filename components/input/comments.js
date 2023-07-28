import { useState } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'

function Comments(props) {
  const { eventId } = props

  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])
  const [isLoading, SetIsLoading] = useState(false)

  async function fetchComments() {
    try {
      const response = await fetch(`/api/comments/${eventId}`)
      const data = await response.json()
      setComments(data.comments)
    } catch (err) {
      console.error(err)
    }
    SetIsLoading(false)
  }

  async function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus)

    if (!showComments) {
      SetIsLoading(true)
      await fetchComments()
      SetIsLoading(false)
    }
  }

  async function addCommentHandler(commentData) {
    SetIsLoading(true)
    try {
      const response = await fetch(`/api/comments/${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: commentData.text,
          email: commentData.email,
          name: commentData.name,
        }),
      })
      const data = await response.json()
      setComments(data.comments)
    } catch (err) {
      console.error(err)
    }
    SetIsLoading(false)
  }

  return (
    <section className={classes.comments}>
      <button disabled={isLoading} onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && (
        <NewComment loading={isLoading} onAddComment={addCommentHandler} />
      )}
      {showComments && comments && <CommentList comments={comments} />}
    </section>
  )
}

export default Comments
