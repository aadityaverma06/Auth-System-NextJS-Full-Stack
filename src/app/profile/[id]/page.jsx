"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import toast from "react-hot-toast";

function Profile({ params }) {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const {id} = use(params);
  const onLogout = async () => {
    try {
      setButtonDisabled(true);
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
    finally {
      setButtonDisabled(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">
        Profile of <span className="text-yellow-300">{id}</span>
      </h1>
      <hr />
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-3 py-1.5 mt-8 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer w-max
        disabled:cursor-not-allowed disabled:opacity-50 text-3xl"
        onClick={onLogout}
        disabled={buttonDisabled}
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
