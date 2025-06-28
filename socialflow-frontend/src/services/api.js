import axios from "axios"


const api = axios.create({
  baseURL : import.meta.env.VITE_API_BASE_URL,
  headers : {
    "Content-Type":"application/json"
  }
})


api.interceptors.request.use((config)=>{
  let token = localStorage.getItem("token")
  if(token){
    config.headers["Authorization"] = `Bearer ${token}`
  }
  return config
})

export const authApi = {

  signup : (userData) => api.post('/auth/signup', userData),
  login : (credentials) => api.post('/auth/login', credentials),
  logout : () => api.delete('/auth/logout'),

}

export const postApi = {

  uploadFile : (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/post/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  createPost : (postData) => api.post('/post/create',postData),
  updatePost : (postId,updatedPostData) => api.put(`/post/update/${postId}`, updatedPostData),
  deletePost : (postId) => api.delete(`/post/delete/${postId}`),
  viewPost   : (postId) => api.get(`/post/view/${postId}`),
  getMyPosts : () => api.get('/post/my-posts'),
  getAllPosts: () => api.get('/post/all-posts'),
  getFeed    : () => api.get('/post/feed'),
  getPostStats:(postId) => api.get(`/post/stats/${postId}`),
  likePost   : (postId) => api.post(`/post/like/${postId}`),
  getPostComments : (postId) => api.get(`/comment/${postId}`),
  unlikePost : (postId) => api.post(`/post/unlike/${postId}`)
  
}

export const commentApi = {

  createComment : (postId,commentData) => api.post(`/comment/create/${postId}`,commentData),
  deleteComment : (commentId) => api.delete(`/comment/${commentId}`),

}

export const userApi = {

  getUserProfile : (userId) => api.get(`/user/profile/${userId}`),
  updateProfile  : (profileData) => api.put('/user/profile', profileData),

}


export default api