import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { useLoginMutation } from "@/services/api";
import { setUserDetails, setUserToken } from "@/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuperAdmin, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginSuperAdmin({ username, password }).unwrap();
      if (response.data) {
        dispatch(
          setUserDetails({
            id: response.data.id,
            name: response.data.name,
            username: response.data.username,
            role: {
              id: response.data.role.id,
              name: response.data.role.name,
            },
            permissions: response.data.permissions,
            city: response.data.city,
          })
        );
      }
      if (response.data.token) {
        dispatch(setUserToken(response.data.token));
      } else {
        console.error("Token is missing in the response.");
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-semibold mb-4">Log In</h1>
        <p className="text-lg  mb-4">
          Welcome back! Please enter your details.
        </p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full mb-4 text-black-2 bg-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full mb-4 text-black-2 bg-white"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
