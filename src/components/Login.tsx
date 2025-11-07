"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { loginUser, selectAuthLoading, selectAuthError } from "@/store/slices/authSlice";

export default function Login() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm w-full">
      <h2 className="text-xl font-semibold text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
