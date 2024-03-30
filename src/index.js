import React from "react";
import ReactDOM from "react-dom/client";

import { Amplify } from "aws-amplify";
import Auth from "@aws-amplify/auth";

import { awsConfig } from "./config/aws";

import App from "./pages/App";
import "./styles/global.css";

const idToken = (await Auth.fetchAuthSession()).tokens?.idToken?.toString();
const accessToken = (await Auth.fetchAuthSession()).tokens?.accessToken?.toString();

console.log("authSession:", await Auth.fetchAuthSession());
console.log("credentials:", await Auth.getCurrentUser());
console.log("idToken:", idToken);
console.log("accessToken:", accessToken);

const authToken = idToken || accessToken;

Amplify.configure(awsConfig.amplifyConfig, {
  API: {
    REST: {
      headers: async () => {
        return { Authorization: `Bearer ${authToken}` };
      },
    },
  },
});

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
