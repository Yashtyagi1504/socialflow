import React from "react";
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)

  const {login} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    

    const result = await login(email,password)

    if(result.success){
      navigate('/')
    } else {
      setError(result.error)
    }
    setLoading(false)
    // console.log('Login attempt:', { email, password })
  }

  return (
    <div  className="flex justify-center items-center min-h-screen p-5 bg-gray-400" >
      <div className="bg-gray-100 p-10 border border-gray-300 rounded max-w-sm w-full text-center shadow-2xl">
        <h1 className="text-3xl font-normal mb-6 italic">SocialFlow</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-1.5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-2 py-2 border border-gray-300 rounded-sm text-sm bg-gray-300 focus:outline-none focus:border-gray-600"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-2 py-2 border border-gray-300 rounded-sm text-sm bg-gray-300 focus:outline-none focus:border-gray-600"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="px-2 py-2 bg-gray-500 text-white border-0 rounded text-sm font-semibold cursor-pointer mt-3 hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="mt-4 text-sm">
          Don't have an account? <Link to="/signup" className="text-gray-400 no-underline hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
