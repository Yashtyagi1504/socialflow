import React,{useContext,createContext, useState} from "react"
import { postApi } from "../services/api";

const PostContext = createContext()

export const PostProvider = ({children})=>{

  const [posts,setPosts] = useState([])
  const [loading,setLoading] = useState(false)

  const fetchFeed = async () => {
    setLoading(true)
    try {
      const response = await postApi.getFeed()
      setPosts(response.data.data)
    } catch (error) {
      console.error('Error fetching feed:', error)
    } finally{
      setLoading(false)
    }
  }

  const likePost = async (postId) => {
    try {
      await postApi.likePost(postId)
      setPosts(posts.map(post=>(
         post._id === postId ? {...post,likesCount: post.likesCount + 1 , isLiked: true} : post
      )))
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }

  const unlikePost = async (postId) => {
    try {
      await postApi.unlikePost(postId)
      setPosts(posts.map(post => post._id === postId ? {...post , likesCount: post.likesCount-1, isLiked:false}:post))
    } catch (error) {
      console.error("Error unliking post:", error)
    }
  }

  return(
    <PostContext.Provider value={{posts,loading,fetchFeed, likePost , unlikePost }}>
      {children}
    </PostContext.Provider>
  )

}

export const usePost = () => useContext(PostContext)