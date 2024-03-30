import React from "react";
import ReactDOM from "react-dom/client";

import { Amplify } from "aws-amplify";
import { awsConfig } from "./config/aws";

import App from "./pages/App";
import "./styles/global.css";

Amplify.configure(awsConfig.amplifyConfig);

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
