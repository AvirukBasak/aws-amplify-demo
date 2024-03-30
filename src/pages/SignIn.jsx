import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Auth from "aws-amplify/auth";

const initialFormState = {
  email: "",
  password: "",
};

export default function SignIn() {
  const [formData, setFormData] = useState(initialFormState);
  const navigate = useNavigate();

  useEffect(() => {
    const isSignedIn = localStorage.getItem("isSignedIn");
    if (isSignedIn) navigate("/home", { replace: true });
  }, [navigate]);

  async function signIn() {
    if (!formData.email || !formData.password) {
      return alert("Please fill all the fields");
    }

    try {
      await Auth.signIn({
        username: formData.email,
        password: formData.password,
      });

      localStorage.setItem("isSignedIn", "true");
      navigate("/home", { replace: true });
    } catch (error) {
      console.error(error);
      alert(error?.message || "Unknown error occurred. Please try again.");
    }
  }

  return (
    <div className="bg-white">
      <div className="grid max-w-screen-xl h-screen text-black m-auto place-content-center">
        <div className="w-[30rem] space-y-6">
          <div className="flex flex-col">
            <label>Email </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="email"
              value={formData.email}
              type="email"
              className="border p-2 rounded border-sky-500"
            />
          </div>

          <div className="flex flex-col">
            <label>Password </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="pasword"
              value={formData.password}
              type="password"
              className="border p-2 rounded border-sky-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              className="border-none bg-sky-700 text-white p-2 rounded"
              onClick={signIn}
            >
              Sign In
            </button>
            <button
              className="border-none bg-sky-700 text-white p-2 rounded"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
