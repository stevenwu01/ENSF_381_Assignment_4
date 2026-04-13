import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DisplayStatus from "./DisplayStatus";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMsg] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  function submitForm(e) {
    e.preventDefault();

    if (username === "" || email === "" || password === "" || confirmPassword === "") {
      setMsg("All fields are required");
      setType("error");
      return;
    }


    const usernameRegex = /^[A-Za-z][A-Za-z0-9_-]{2,19}$/;
    if (!usernameRegex.test(username)) {
      setMsg("Username must be 3-20 chars and start with a letter");
      setType("error");
      return;
    }

    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(email)) {
      setMsg("Invalid email format");
      setType("error");
      return;
    }

    if (password.length < 8) {
      setMsg("Password must be at least 8 characters");
      setType("error");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setMsg("Password must include uppercase letter");
      setType("error");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setMsg("Password must include lowercase letter");
      setType("error");
      return;
    }

    if (!/[0-9]/.test(password)) {
      setMsg("Password must include a number");
      setType("error");
      return;
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      setMsg("Password must include special character");
      setType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMsg("Passwords do not match");
      setType("error");
      return;
    }

    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        setMsg(data.message);
        setType(data.success ? "success" : "error");

        if (data.success) {
          setTimeout(function () {
            navigate("/login");
          }, 1000);
        }
      })
      .catch(() => {
        setMsg("Something went wrong");
        setType("error");
      });
  }

  return (
    <form onSubmit={submitForm}>
      <h2>Signup</h2>

      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={function (e) {
            setUsername(e.target.value);
          }}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={function (e) {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={function (e) {
            setPassword(e.target.value);
          }}
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={function (e) {
            setConfirmPassword(e.target.value);
          }}
        />
      </div>

      <button type="submit">Signup</button>

      {message !== "" && (
        <DisplayStatus type={type} message={message} />
      )}
    </form>
  );
}

export default SignupForm;