import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Auth from "aws-amplify/auth";

const States = {
  SIGN_UP: "SIGN_UP",
  VERIFY_USER: "VERIFY_USER",
};

function Register({
  stateManager: { state, setState },
  usernameManager: { username, setUsername },
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    gender: "SELECT",
  });

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

      setUsername(formData.email);
      setState(States.VERIFY_USER);
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

function VerifyUser({ usernameManager: { username, setUsername } }) {
  const [formData, setFormData] = useState({
    code: "",
  });
  const navigate = useNavigate();

  async function confirmSignUp() {
    if (!formData.code) {
      return alert("Please fill the code field");
    }

    try {
      const response = await Auth.confirmSignUp({
        confirmationCode: formData.code,
        username: username || "",
      });

      if (response.nextStep.signUpStep === "COMPLETE_AUTO_SIGN_IN") {
        await Auth.autoSignIn();
        localStorage.setItem("isSignedIn", "true");
        navigate("/home", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error(error);
      alert(error?.message || "Unknown error occurred. Please try again.");
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

export default function SignUp() {
  const [state, setState] = useState(States.SIGN_UP);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isSignedIn = localStorage.getItem("isSignedIn");
    if (isSignedIn) navigate("/home", { replace: true });
  }, [navigate]);

  return (
    <div className="grid max-w-screen-xl h-screen text-black m-auto place-content-center">
      {state === States.SIGN_UP && (
        <Register
          stateManager={{ state, setState }}
          usernameManager={{ username, setUsername }}
        />
      )}
      {state === States.VERIFY_USER && (
        <VerifyUser usernameManager={{ username, setUsername }} />
      )}
    </div>
  );
}
