import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DisplayStatus from "./DisplayStatus";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMsg] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  function submitForm(e) {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      setMsg("Username and password cannot be empty");
      setType("error");
      return;
    }

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setMsg(data.message);
        setType(data.success ? "success" : "error");

        if (data.success) {
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("username", data.username);

          setTimeout(() => {
            navigate("/flavors");
          }, 1000);
        }
      })
      .catch(() => {
        setMsg("Server error");
        setType("error");
      });
  }

  return (
    <form onSubmit={submitForm}>
      <h2>Login</h2>

      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">Login</button>

      <p>
        Need an account? <Link to="/signup">Sign up</Link>
      </p>

      {message !== "" && (
        <DisplayStatus type={type} message={message} />
      )}
    </form>
  );
}

export default LoginForm;