import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import CommentForm from '../components/post/CommentForm'
import CommentList from '../components/post/CommentList'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useAuth } from '../context/AuthContext'
import { usePost } from '../context/PostContext'

function HomePage() {
  const { user } = useAuth()
  const { posts, loading, fetchFeed, likePost, unlikePost } = usePost()
  const navigate = useNavigate()
  const [newComments, setNewComments] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadFeed = async () => {
      try {
        await fetchFeed()
      } catch (err) {
        setError('Failed to load posts. Please try again.')
      }
    }

    loadFeed()
  }, [])

  const handleLike = async (postId, isLiked) => {
    try {
      if (isLiked) {
        await unlikePost(postId)
      } else {
        await likePost(postId)
      }
    } catch (err) {
      console.error('Error toggling like:', err)
    }
  }

  const handleCommentAdded = (postId, comment) => {
    setNewComments(prev => ({
      ...prev,
      [postId]: comment
    }))
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="max-w-5xl mx-auto mt-20">
          <LoadingSpinner size="large" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="max-w-5xl mx-auto mt-20 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-6 flex gap-6 px-5">
        <div className="flex-1 max-w-[614px]">
          {posts.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <h2 className="text-xl font-semibold mb-2">Welcome to Instagram!</h2>
              <p className="text-gray-500 mb-4">Start sharing photos and videos.</p>
              <button
                onClick={() => navigate('/create')}
                className="px-6 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600"
              >
                Create Your First Post
              </button>
            </div>
          ) : (
            posts.map(post => (
              <div key={post._id} className="bg-white border border-gray-300 rounded mb-6">
                <div className="p-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-xs text-white font-medium">
                      {post.user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="text-sm font-medium">{post.user?.name || 'Anonymous'}</span>
                  </div>
                </div>

                {post.image && (
                  <div className="w-full">
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full h-auto block"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/500?text=Image+Not+Found'
                      }}
                    />
                  </div>
                )}

                <div className="p-3 flex gap-4">
                  <button
                    onClick={() => handleLike(post._id, post.isLiked)}
                    className={`bg-transparent border-0 text-sm cursor-pointer p-0 transition-colors ${
                      post.isLiked ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
                    }`}
                  >
                    {post.isLiked ? '❤️' : '🤍'} {post.likesCount || 0}
                  </button>
                  <button className="bg-transparent border-0 text-sm cursor-pointer p-0 text-gray-700 hover:text-gray-900">
                    💬 {post.commentCount || 0}
                  </button>
                  <button className="bg-transparent border-0 text-sm cursor-pointer p-0 text-gray-700 hover:text-gray-900">
                    📤 Share
                  </button>
                </div>

                <div className="px-4 pb-3 text-sm">
                  {post.text && (
                    <p><span className="font-medium">{post.user?.name}</span> {post.text}</p>
                  )}
                  <p className="text-gray-600 text-xs mt-2">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>

                <CommentList postId={post._id} newComment={newComments[post._id]} />

                <div className="border-t border-gray-100 px-4 py-2">
                  <CommentForm
                    postId={post._id}
                    onCommentAdded={(comment) => handleCommentAdded(post._id, comment)}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="w-80 sticky top-20 h-fit hidden md:block">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <p className="font-medium text-sm">{user?.name}</p>
              <p className="text-xs text-gray-600">@{user?.name?.toLowerCase().replace(/\s+/g, '_')}</p>
            </div>
          </div>

          <h3 className="text-sm text-gray-600 mb-4">Suggestions For You</h3>
          <div className="flex flex-col gap-3">
            <p className="text-xs text-gray-500">Coming soon...</p>
          </div>

          <div className="mt-8 text-xs text-gray-400">
            <p>&copy; 2025 Instagram Clone</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
