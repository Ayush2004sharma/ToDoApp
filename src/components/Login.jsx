import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import gsap from "gsap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const cardRef = useRef(null);
  const buttonRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.to(buttonRef.current, {
      boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "power1.inOut",
    });
  }, []);

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  };

  const handleLogin = () => {
    if (!validateEmail(username)) {
      setError(true);
      gsap.fromTo(inputRef.current, { x: -5 }, { x: 5, duration: 0.1, repeat: 3, yoyo: true });
      return;
    }

    if (password.trim()) {
      const user = { name: username, password };
      dispatch(login(user));
      setError(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        ref={cardRef}
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border shadow-blue-400 border-gray-300 transform transition-all duration-300"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>

        <input
          ref={inputRef}
          type="text"
          placeholder="Enter your Gmail"
          className={`w-full px-4 py-3 mt-3 bg-gray-100 border ${
            error ? "border-red-500" : "border-gray-300"
          } text-gray-800 rounded-lg focus:outline-none focus:ring-2 ${
            error ? "focus:ring-red-400" : "focus:ring-blue-400"
          } transition-transform duration-300 hover:scale-105`}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError(false);
          }}
        />
        {error && <p className="text-red-500 text-sm mt-1">Please enter a valid Gmail address</p>}

        <input
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-3 mt-3 bg-gray-100 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform duration-300 hover:scale-105"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          ref={buttonRef}
          className="w-full py-3 mt-5 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-300"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
