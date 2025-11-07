"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { fetchMe } from "@/store/slices/authSlice";

export default function AuthInit() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMe()); // silently restore auth on load
  }, [dispatch]);

  return null; // does not render anything visible
}
