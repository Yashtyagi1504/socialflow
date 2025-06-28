import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-white border-b border-gray-300 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-5 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-normal italic text-gray-900">Instagram</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {user ? (
            <>
              <Link to="/" className="text-sm text-gray-900 hover:text-gray-600">Home</Link>
              <Link to="/create" className="text-sm text-gray-900 hover:text-gray-600">Create</Link>
              <Link to="/profile" className="text-sm text-gray-900 hover:text-gray-600 flex items-center gap-1">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-xs text-white">
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </div>
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-900 hover:text-gray-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-sm text-gray-900 hover:text-gray-600">Login</Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-300 bg-white">
          {user ? (
            <div className="flex flex-col p-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="py-2 text-gray-900">Home</Link>
              <Link to="/create" onClick={() => setIsMenuOpen(false)} className="py-2 text-gray-900">Create</Link>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="py-2 text-gray-900">Profile</Link>
              <button onClick={handleLogout} className="py-2 text-left text-gray-900">Logout</button>
            </div>
          ) : (
            <div className="p-4">
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-900">Login</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
