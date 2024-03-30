import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const pendingVerification = localStorage.getItem("pendingVerification");
    const isSignedIn = localStorage.getItem("isSignedIn");

    if (isSignedIn) navigate("/home", { replace: true });
    else if (pendingVerification) navigate("/verify", { replace: true });
    else navigate("/login", { replace: true });

  }, [navigate]);

  return <></>;
}
