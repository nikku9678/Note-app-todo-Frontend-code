import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
// import { Context, server } from "../main";
import '../styles/login.scss'
import { base_url } from "../config";
import { Context } from "../main";
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated,setIsAuthenticated,loading,setLoading} =useContext(Context);
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(email,password);
    // setLoading(true);
    try {
        const { data } = await axios.post(
          `${base_url}/users/login`,
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
  
        toast.success(data.message);
        setIsAuthenticated(true);
        setLoading(false);
    
      } catch (error) {
        toast.error(error.response.data.message);
        setIsAuthenticated(false);
        setLoading(false);
      }
  };

  if(isAuthenticated) return  <Navigate to="/" />;

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button disabled={loading} type="submit" >
            Login
          </button>
          <h4>Or</h4>
          <Link to="/register">Sign Up</Link>
        </form>
      </section>
    </div>
  );
};

export default Login;