"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function forgotPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [processing, setProcessing] = useState(false);
  const router = useRouter();
  const onChangePassword = async () => {
    try {
      setProcessing(true);
      if (token.length == 0) {
        return toast.error("Invalid token");
      }
      console.log(token, oldPassword, newPassword);
      const response = await axios.post("/api/users/forgotpassword", {
        token,
        oldPassword,
        newPassword,
      });
      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }
      toast.success(response.data.message);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
    finally{
      setProcessing(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
    console.log(urlToken);
  }, []);

  return (
    <div className="mt-12 flex flex-col items-center justify-center py-2 text-2xl gap-3">
      <h1 className="text-5xl mb-16">
        {processing ? "Processing" : "Create New Password"}
      </h1>
      <label htmlFor="oldPassword">Old Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white placeholder-gray-400 text-black"
        type="password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        placeholder="old password"
      />
      <label htmlFor="newPassword">New Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white placeholder-gray-400 text-black"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="new password"
      />
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-3 py-1.5 mt-8 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer w-max disabled:cursor-not-allowed disabled:opacity-50"
        onClick={onChangePassword}
      >
        Change Password
      </button>
      <Link
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer w-max text-center"
        href="/login"
      >
        Visit Login page
      </Link>
    </div>
  );
}
