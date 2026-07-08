import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass rounded-3xl p-8 shadow-xl text-center max-w-md w-full">
        <h1 className="text-2xl font-bold font-montserrat">Page not found</h1>
        <p className="text-sm text-slate-600 mt-2">The page you are looking for does not exist.</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center px-5 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

