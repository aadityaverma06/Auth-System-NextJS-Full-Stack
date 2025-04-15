"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
export default function verifyUser() {
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  const onVerifyUser = async () => {
    try {
      setProcessing(true);
      const response = await axios.post("/api/users/verifyuser", { email });
      console.log(response);
      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }

      toast.success(response.data.message);
      router.push("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="mt-12 flex flex-col items-center justify-center py-2 text-2xl gap-3">
      <h1 className="text-5xl mb-8">
        {processing ? "Processing" : "Please enter your email to verify"}
      </h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white placeholder-gray-400 text-black"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-3 py-1.5 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer w-max disabled:cursor-not-allowed disabled:opacity-50"
        onClick={onVerifyUser}
      >
        Verify
      </button>
    </div>
  );
}
