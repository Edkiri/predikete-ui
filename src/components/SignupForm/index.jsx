import React, { useState } from "react";
import axios from "axios";
import { useInputValue } from "@hooks/useInputValue";
import { useNavigate } from "react-router";

import "./styles.css";
import { PREDIKETE_API } from "../../constants";

export const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const email = useInputValue("");
  const username = useInputValue("");
  const password = useInputValue("");
  const rePassword = useInputValue("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    setLoading(true);
    setError("");
    event.preventDefault();
    if (password.value === rePassword.value) {
      const formData = {
        username: username.value,
        email: email.value,
        password: password.value,
      };
      axios
        .post(`${PREDIKETE_API}/users`, formData, {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        })
        .then((res) => {
          setLoading(false);
          navigate("/verify");
        })
        .catch((err) => {
          setLoading(false);
          setError(err.response.data.message);
        });
    } else {
      setLoading(false);
      setError("Passwords does not match");
    }
  };

  return (
    <form className="SignupFormContainer" onSubmit={handleSubmit}>
      <h2>Sign up</h2>

      <div className="SignupForm">
        <div className="FormItem">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Entry your email"
            {...email}
            disabled={loading}
          />
        </div>
        <div className="FormItem">
          <label>Username:</label>
          <input
            type="text"
            placeholder="Entry your username"
            {...username}
            disabled={loading}
          />
        </div>
        <div className="FormItem">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Entry your password"
            {...password}
            disabled={loading}
          />
        </div>
        <div className="FormItem">
          <label>Password confirmation:</label>
          <input
            type="password"
            placeholder="Re-entry your password"
            {...rePassword}
            disabled={loading}
          />
        </div>
      </div>
      {loading && <p className="FormLoading">Loading...</p>}
      {error && <p className="FormError">{error}</p>}

      <button type="submit" disabled={loading}>
        Sign up
      </button>
    </form>
  );
};
