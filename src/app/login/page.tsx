"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signupage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      if (!response) {
        console.log("some thing went wrong", response);
      }
      console.log("login successfully", response.data);
      setLoading(false)
      router.push("/profile");
    } catch (error: any) {
      console.log("login failed");
      toast.error(error.message);
    }
  };
  //useEffect
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false); //noticable point
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1> {loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        type="text"
        placeholder="email"
        id="email"
      />
      <label htmlFor="password">password</label>
      <input
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        type="text"
        placeholder="password"
        id="password"
      />
      <button
      onClick={onLogin}
      className="p-2 border border-gray-300 rounded-lg mb-4
      focus:outline-none focus:border-t-gray-600"
      >
        {buttonDisabled ?"Fill the Details" : "login"}
      </button>
      <Link href={"/signup"}>Don't have account visit to Signup</Link>
    </div>
  );
}
