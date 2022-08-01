import React, { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import { useInputValue } from "@hooks/useInputValue";
import { Context } from "@context/AppContext";

import "./styles.css";
import { PREDIKETE_API } from "../../constants";

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(Context);

  const navigate = useNavigate();

  const email = useInputValue("");
  const password = useInputValue("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { email: email.value, password: password.value };
    fetch(`${PREDIKETE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          if ([401, 404].some((status) => res.statusCode === status)) {
            setError("Email or password incorrect.");
          }
        }
        if (res["access_token"]) {
          login({ jwt: res.access_token, user: res.user });
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="LoginFormContainer">
      <h2>Login</h2>

      <div className="LoginForm">
        <div className="FormItem">
          <label>Email:</label>
          <input
            type="text"
            placeholder="Entry your email"
            disabled={loading}
            {...email}
          />
        </div>
        <div className="FormItem">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Entry your password"
            disabled={loading}
            {...password}
          />
        </div>
      </div>

      <p className="SignupP">
        Don't have an account?<Link to="/signup">Create new</Link>
      </p>
      {error && <p className="FormError">{error}</p>}
      <button>Login</button>
    </form>
  );
};
