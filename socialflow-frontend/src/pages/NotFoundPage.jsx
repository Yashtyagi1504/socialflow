import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Sorry, this page isn't available.</p>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        The link you followed may be broken, or the page may have been removed.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600"
      >
        Go back to Instagram
      </Link>
    </div>
  )
}

export default NotFoundPage
