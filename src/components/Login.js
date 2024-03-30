// Login.js
import React, { useState } from "react";

function Login({ onLogin, setLoggedIn }) { // Add setLoggedIn as a prop
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    if (username === "siri" && password === "siri@2000") {
      setErrorMsg("");
      setLoggedIn(true); // Update loggedIn state
      onLogin(); // Call onLogin function
    } else {
      setErrorMsg("Invalid Username or Password");
      setUsername("");
      setPassword("");
    }
  };

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="container">
      <div className="login-bg-container">
        <div className="login-card">
          <h1>Login</h1>
          <form className="form-container">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className="form-input"
              value={username}
              onChange={onChangeUsername}
            />
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={onChangePassword}
            />
            {errorMsg && <div className="text-danger">{errorMsg}</div>}
            <div>
              <button type="button" className="login-btn" onClick={handleLogin}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
