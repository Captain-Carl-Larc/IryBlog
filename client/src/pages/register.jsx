function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="flex justify-center items-center bg-green-600 p-4 min-h-screen">
      <div className="bg-white shadow-lg mx-auto p-6 rounded-lg w-full max-w-md">
        <h2 className="mb-6 font-bold text-gray-800 text-2xl text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="email"
              className="mb-2 font-medium text-gray-700 text-sm"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              autoComplete="email"
              className="px-4 py-2 border-2 border-gray-300 focus:border-blue-500 rounded-md outline-none focus:ring-2 focus:ring-blue-200 text-base transition duration-200"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="username"
              className="mb-2 font-medium text-gray-700 text-sm"
            >
              Username:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              required
              autoComplete="username"
              className="px-4 py-2 border-2 border-gray-300 focus:border-blue-500 rounded-md outline-none focus:ring-2 focus:ring-blue-200 text-base transition duration-200"
              placeholder="Enter your username"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="password"
              className="mb-2 font-medium text-gray-700 text-sm"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              autoComplete="new-password"
              className="px-4 py-2 border-2 border-gray-300 focus:border-blue-500 rounded-md outline-none focus:ring-2 focus:ring-blue-200 text-base transition duration-200"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex flex-col mb-6">
            <label
              htmlFor="confirm-password"
              className="mb-2 font-medium text-gray-700 text-sm"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              required
              autoComplete="new-password"
              className="px-4 py-2 border-2 border-gray-300 focus:border-blue-500 rounded-md outline-none focus:ring-2 focus:ring-blue-200 text-base transition duration-200"
              placeholder="Retype your password"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full font-semibold text-white transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
