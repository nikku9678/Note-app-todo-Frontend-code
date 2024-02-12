import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import "../styles/app.scss";
import { Context } from "../main";
import { base_url } from "../config";
const Header = () => {
  const {isAuthenticated,setIsAuthenticated} = useContext(Context);
  const logoutHandler = async (e) => {
    e.preventDefault();
    
    try {
      await axios.get(`${base_url}/users/logout`, {
        withCredentials: true,
      });

      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      // setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      // setLoading(false);
    }
  };
  return (
    <nav className="header">

 <div>
        <h2>Todo App.</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>

        {isAuthenticated ? (
          <>
            <button onClick={logoutHandler} className="btn">Logout</button>
          </>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article> 
    </nav>
  );
};

export default Header;
