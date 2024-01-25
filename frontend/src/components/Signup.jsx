import React, { useRef, useState } from "react";

const Signup = () => {
  const firstName = useRef("");
  const lastName = useRef("");
  const email = useRef("");
  const username = useRef("");
  const password = useRef("");
  const confirmPassword = useRef("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const verifyPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setError(true);
      setErrorMessage("Passwords do not match");
    } else if (
      password.match(
        "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$"
      )
    ) {
      setError(true);
      setErrorMessage(
        "Password must contain at least 8 characters, one letter, one number, and one special character"
      );
    } else {
      setError(false);
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    verifyPassword(password?.current?.value, confirmPassword?.current?.value);
    if (error) return;
    const payload = {
      firstName: firstName?.current?.value,
      lastName: lastName?.current?.value,
      email: email?.current?.value,
      username: username?.current?.value,
      password: password?.current?.value,
    };
    try {
      await fetch("/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up for an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username{" "}
              </label>
              <input
                type="text"
                autoComplete="username"
                ref={username}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="firstName" className="sr-only">
                First Name
              </label>
              <input
                type="text"
                autoComplete="name"
                ref={firstName}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="First Name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">
                Last Name
              </label>
              <input
                type="text"
                autoComplete="name"
                ref={lastName}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Last Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email{" "}
              </label>
              <input
                type="email"
                autoComplete="email"
                ref={email}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                ref={password}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Confirm Password
              </label>
              <input
                type="password"
                ref={confirmPassword}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-sm font-bold">{errorMessage}</div>
          )}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
