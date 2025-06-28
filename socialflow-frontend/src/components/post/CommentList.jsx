import { useState, useEffect } from "react";
import { postApi, commentApi } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function CommentList({ postId, newComment }) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const {user} = useAuth()

  useEffect(() => {
    fetchComments()
  },[postId])

  useEffect(() => {
    if (newComment) {
      setComments([newComment, ...comments])
    }
  },[newComment])

  const fetchComments = async () => {
    try {
      const response = await postApi.getPostComments(postId)
      setComments(response.data.data)
    } catch (error) {
      console.error('Error fetching comments:',error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (commentId) => {
    try {
      await commentApi.deleteComment(commentId)
      setComments(comments.filter(comment => comment._id !== commentId))
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
  }

  if (loading) {
    return <div className="text-xs text-gray-500 px-4 pb-2">Loading comments...</div>
  }

  if (comments.length === 0) {
    return null
  }

  return (
    <div className="px-4 pb-2">
      {comments.map(comment => (
        <div key={comment._id} className="flex justify-between py-1">
          <p className="text-sm">
            <span className="font-medium">{comment.user?.name}</span>
            {comment.text}
          </p>

          {comment.user?._id === user?._id && (
            <button
              onClick={() => handleDelete(comment._id)}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Delete
            </button>
          )}

        </div>
      ))}
    </div>
  )

}

export default CommentList