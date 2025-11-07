"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { registerUser, selectAuthLoading, selectAuthError } from "@/store/slices/authSlice";

export default function Register() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm w-full">
      <h2 className="text-xl font-semibold text-center">Register</h2>

      <input name="name" placeholder="Name" className="border p-2 rounded" value={form.name} onChange={handleChange} />

      <input name="email" placeholder="Email" className="border p-2 rounded" value={form.email} onChange={handleChange} />

      <input name="phone" placeholder="Phone" className="border p-2 rounded" value={form.phone} onChange={handleChange} />

      <input name="password" type="password" placeholder="Password" className="border p-2 rounded" value={form.password} onChange={handleChange} />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button type="submit" className="bg-green-600 text-white py-2 rounded" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
