"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Profile() {
  const router = useRouter();
  const [username, setUsername] = useState("No Username");
  const onLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }
      toast.success(response.data.message);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      const response = await axios.get("/api/users/me");
      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }
      toast.success(response.data.message);
      setUsername(response.data.user.username);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-5xl">
        {username === "No Username" ? (
          "No Username"
        ) : (
          <Link href={`/profile/${username}`} className="text-yellow-300 bg-gray-700 border border-none rounded-lg">
            {username}
          </Link>
        )}
      </h1>
      <hr />
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-3 py-1.5 mt-8 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer w-max text-3xl"
        onClick={onLogout}
      >
        Logout
      </button>
      <button
        type="button"
        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-3 py-1.5 mt-8 mb-4 green:bg-blue-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 cursor-pointer w-max text-3xl"
        onClick={getUserData}
      >
        User Data
      </button>
    </div>
  );
}

export default Profile;
