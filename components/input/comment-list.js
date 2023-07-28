import classes from './comment-list.module.css'

function CommentList({ comments }) {
  return (
    <ul className={classes.comments}>
      {comments.map((comment) => (
        <li key={comment.commentId}>
          <p>{comment.text}</p>
          <div>
            <p>{comment.email}</p>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default CommentList
