import { Link } from "react-router-dom";
import { useState } from "react";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(email, password, username);
  };

  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="" className="w-52" />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8  space-y-6 bg-black/50 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Sign up
          </h1>

          <form action="" className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md-bg-transparent text-white 
                focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="abc123@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-300 block"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md-bg-transparent text-white 
                focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="abc123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md-bg-transparent text-white 
                        focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="mt-5 w-full py-2 bg-red-600 text-white font-seminold rounded-md 
              hover:bg-gray-600 transition duration-200 cursor-pointer"
              >
                Sign up
              </button>
            </div>
          </form>

          <div className="text-gray-200 text-center">
            Already have an account?{" "}
            <Link to={"/signup"} className="text-red-500 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
