"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user.username.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const postData = await axios.post("/api/users/login", user);
      if (postData.data.error) {
        toast.error(postData.data.error);
        return;
      }
      toast.success(postData.data.message);
      router.push(`/profile/${user.username}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      user.username = "";
      user.password = "";
    }
  };

  const onForgotPassword = async () => {
    try {
      router.push("/verifyuser");
    } catch (error) {
      console.log(error);
    }
  };

  const onHome = () => {
    try {
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-3xl">
      <div className="flex flex-col gap-[32px] row-start-2 items-center justify-center">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-purple-700">
            {loading ? "Processing.." : "Login"}
          </span>
        </h1>
      </div>
      <div className="mt-12 flex flex-col items-center justify-center py-2 text-2xl gap-3">
        <label htmlFor="username">Username</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white placeholder-gray-400 text-black"
          type="email"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
        <label htmlFor="password">Password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white placeholder-gray-400 text-black"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          type="button"
          className=" flex justify-center items-center gap-2 text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg px-3 py-1.5 mt-2 mb-16 dark:bg-purple-700 dark:hover:bg-purple-800 focus:outline-none dark:focus:ring-purple-900 cursor-pointer w-full disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onLogin}
          disabled={buttonDisabled}
        >
          <Image
            className="invert mr-2"
            src="/login.svg"
            alt="Login logomark"
            width={20}
            height={20}
          />
          Login
        </button>
        <Link
          className=" text-white flex justify-center bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg px-3 py-1.5 mb-4 dark:bg-pink-700 dark:hover:bg-pink-800 focus:outline-none dark:focus:ring-pink-900 cursor-pointer w-full text-center"
          href="/signup"
        >
          <Image
            className="invert mr-2"
            src="/signup.svg"
            alt="Login logomark"
            width={20}
            height={20}
          />
          Visit Signup page
        </Link>
        <button
          type="button"
          className="text-white flex justify-center bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg px-3 py-1.5 mb-4 dark:bg-pink-700 dark:hover:bg-pink-800 focus:outline-none dark:focus:ring-pink-900 cursor-pointer w-full disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onForgotPassword}
        >
          <Image
            className="invert mr-2"
            src="/forgotpassword.svg"
            alt="Login logomark"
            width={20}
            height={20}
          />
          Forgot Password
        </button>
        <button
          type="button"
          className="text-white flex justify-center bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg px-3 py-1.5 mb-4 dark:bg-pink-700 dark:hover:bg-pink-800 focus:outline-none dark:focus:ring-pink-900 cursor-pointer w-full disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onHome}
        >
          <Image
            className="invert mr-2"
            src="/home.svg"
            alt="Login logomark"
            width={20}
            height={20}
          />
          Visit Home Page
        </button>
      </div>
    </div>
  );
}
