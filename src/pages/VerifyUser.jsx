import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "@aws-amplify/auth";

const initialFormState = { code: "" };

export default function VerifyUser() {
  const [formData, setFormData] = useState(initialFormState);
  const navigate = useNavigate();

  useEffect(() => {
    const isSignedIn = localStorage.getItem("isSignedIn");
    const username = localStorage.getItem("username");
    if (isSignedIn) {
      navigate("/home", { replace: true });
    } else if (!username) {
      alert("Please sign up first");
      navigate("/", { replace: true });
    }
  }, [navigate]);

  async function confirmSignUp() {
    const username = localStorage.getItem("username");

    if (!formData.code) {
      return alert("Please fill the code field");
    }

    try {
      await Auth.confirmSignUp({
        confirmationCode: formData.code,
        username: username || "",
      });

      localStorage.setItem("isVerified", "true");
      localStorage.removeItem("pendingVerification");

      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="grid max-w-screen-xl h-screen text-black m-auto place-content-center">
      <div className="w-[30rem] space-y-6">
        <label htmlFor="Confirmation Code">
          Enter the confirmation code sent to your email
        </label>
        <input
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          placeholder="code"
          value={formData.code}
          type="text"
          className="border border-sky-500 p-2 rounded w-full shadow"
        />
      </div>
      <button
        className="border-2 bg-sky-700 border-none text-white p-2 mt-4 mr-auto rounded"
        onClick={confirmSignUp}
      >
        Confirm
      </button>
    </div>
  );
}
