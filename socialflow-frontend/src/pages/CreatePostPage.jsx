import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import { useAuth } from '../context/AuthContext'
import { postApi } from '../services/api'

function CreatePostPage() {
  const [text, setText] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imagePreview, setImagePreview] = useState(null)

  const navigate = useNavigate()
  const { user } = useAuth()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!text.trim() && !selectedFile) {
      setError('Please enter some text or select an image')
      return
    }

    setLoading(true)
    setError('')

    try {
      let imageUrl = null

      // Upload image if selected
      if (selectedFile) {
        const uploadResponse = await postApi.uploadFile(selectedFile)
        // console.log(uploadResponse)
        imageUrl = uploadResponse.data.data.file_url
      }

      // Create post
      const postData = {
        text: text.trim(),
        image: imageUrl
      }

      // console.log(postData)

      await postApi.createPost(postData)
      navigate('/')
    } catch (error) {
      console.error('Error creating post:', error)
      setError('Failed to create post. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto mt-6 px-5">
        <div className="bg-white border border-gray-300 rounded p-6">
          <h2 className="text-xl font-semibold mb-6">Create New Post</h2>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="What's on your mind?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded mb-4 min-h-[100px] focus:outline-none focus:border-blue-500"
            />

            {/* Image Upload Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add an image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-2"
              />

              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full h-64 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null)
                      setImagePreview(null)
                    }}
                    className="mt-2 text-sm text-red-500 hover:text-red-700"
                  >
                    Remove image
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Posting...' : 'Post'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded font-medium hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePostPage
