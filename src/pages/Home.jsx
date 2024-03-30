import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as API from "aws-amplify/api";
import  * as Auth from "aws-amplify/auth";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [helloText, setHelloText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isSignedIn = localStorage.getItem("isSignedIn");
    if (!isSignedIn) navigate("/login", { replace: true });
  }, [navigate]);

  /**
   * @param {string} str
   */
  function sayHello(str) {
    API.get({
      apiName: "RestApiV2",
      path: `/say-hello/${str}`,
    })
      .response.then((response) => response.body.json())
      .then((data) => JSON.parse(JSON.stringify(data || {})))
      .then((data) => alert(data.message))
      .catch((error) => console.error(error));
  }

  /**
   * @param {string} str
   */
  function protectedSayHello(str) {
    API.get({
      apiName: "RestApiV2",
      path: `/protected-say-hello/${str}`,
    })
      .response.then((response) => response.body.json())
      .then((data) => JSON.parse(JSON.stringify(data || {})))
      .then((data) => alert(data.message))
      .catch((error) => console.error(error));
  }

  async function signOut() {
    try {
      await Auth.signOut();
      localStorage.removeItem("isSignedIn");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>
        <label htmlFor="sayHello">Say Hello</label>
        <input
          type="text"
          id="sayHello"
          value={helloText}
          onChange={(e) => setHelloText(e.target.value)}
        />
        <button onClick={(e) => sayHello(helloText)}>Say Hello</button>
        <button onClick={(e) => protectedSayHello(helloText)}>Protected Say Hello</button>
        <button onClick={e => signOut()}>Sign Out</button>
      </div>
    </div>
  );
}
