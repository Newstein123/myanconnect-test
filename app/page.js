"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  // Define the fetchData function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fetchData = () => {
    axios
      .get("http://localhost/api/v1/hotels", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data); // Handle the data from the API
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Handle any errors
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost/api/v1/auth/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        getUser(response.data.data.token);
      });
  };

  const getUser = (token) => {
    console.log(token);
    axios
      .get("http://localhost/api/v1/auth/user", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  };
  // Call fetchData when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* Add any UI you want to display */}
      <h1>Welcome to the Home Page</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
