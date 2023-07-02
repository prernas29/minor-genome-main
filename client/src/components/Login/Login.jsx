import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

import axios from "../api/axios";
const LOGIN_URL = "/auth";
const Login = () => {
      const { auth,setAuth, persist, setPersist } = useAuth();


  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);
const togglePersist = () => {
  setPersist((prev) => !prev);
};

useEffect(() => {
  localStorage.setItem("persist", persist);
}, [persist]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      console.log(response);
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      const address = response?.data?.address;
      console.log(address);
      const add = address[0];
      console.log(auth);
      setAuth({ user, roles, accessToken, address });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form className="logForm" onSubmit={handleSubmit}>
        <label className="logLabel" htmlFor="username">
          Username:
        </label>
        <input
          className="logInput"
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />

        <label className="logLabel" htmlFor="password">
          Password:
        </label>
        <input
          className="logInput"
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button className="logInput">Sign In</button>
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor="persist">Trust This Device</label>
        </div>
      </form>
      <p style={{
        
       color:"black" 
      }}>
        Need an Account?
        <br />
        <span className="line">
          <Link className="loginLink" to="/register">
            Sign Up
          </Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
