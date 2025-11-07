"use client";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectAuthUser, logoutUser } from "@/store/slices/authSlice";
import Login from "@/components/Login";
import Register from "@/components/Register";

export default function LandingPage() {
  const user = useAppSelector(selectAuthUser);
  const dispatch = useAppDispatch();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">

      {/* If logged in */}
      {user ? (
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-2xl">Welcome, <span className="font-bold">{user.name}</span></h1>
          <button
            className="bg-red-600 text-white py-2 px-4 rounded"
            onClick={() => dispatch(logoutUser())}
          >
            Logout
          </button>
        </div>
      ) : (
        // If not logged in
        <div className="flex gap-16">
          <Login />
          <Register />
        </div>
      )}
    </div>
  );
}
