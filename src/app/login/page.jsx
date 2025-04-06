export default function LoginPage() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100">
        <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="m-1 text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
          <form className="flex flex-col justify-center items-center space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <button
              type="submit"
              className="w-30 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }