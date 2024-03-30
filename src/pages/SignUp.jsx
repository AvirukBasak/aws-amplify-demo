import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "@aws-amplify/auth";

const initialFormState = {
  email: "",
  password: "",
  confirmPassword: "",
  gender: "SELECT",
};

export default function SignUp() {
  const [formData, setFormData] = useState(initialFormState);
  const navigate = useNavigate();

  useEffect(() => {
    const pendingVerification = localStorage.getItem("pendingVerification");
    const isSignedIn = localStorage.getItem("isSignedIn");

    if (isSignedIn) navigate("/home", { replace: true });
    else if (pendingVerification) navigate("/verify", { replace: true });
  }, [navigate]);

  async function signUp() {
    if (formData.password !== formData.confirmPassword) {
      return alert("Password does not match");
    }

    if (
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData
    ) {
      return alert("Please fill all the fields");
    }

    if (formData.gender === "SELECT") {
      return alert("Please select your gender");
    }

    try {
      await Auth.signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
            gender: formData.gender,
          },
          autoSignIn: true,
        },
      });

      localStorage.setItem("username", formData.email);
      localStorage.setItem("pendingVerification", "true");

      navigate("/verify", { replace: true });
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

          <div className="flex flex-col">
            <label>Confirm Password </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="pasword"
              value={formData.confirmPassword}
              type="password"
              className="border p-2 rounded border-sky-500"
            />
          </div>

          <div className="flex flex-col">
            <label>Gender</label>
            <select
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              value={formData.gender}
              className="border p-2 rounded border-sky-500"
            >
              <option value="SELECT">Select your Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="TRANS">Transgender</option>
            </select>
          </div>

          <div>
            <button
              className="border-none bg-sky-700 text-white p-2 mt-4 rounded m-auto"
              onClick={signUp}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
