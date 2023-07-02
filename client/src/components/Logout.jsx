import React from 'react'
import useLogout from "./hooks/useLogout"
import { useNavigate } from "react-router-dom";
const Logout = () => {
    const logout = useLogout();
    const navigate = useNavigate();
    const signOut = async () => {
      await logout();
      navigate("/");
    };
    return (
      <>
            <div>Are You Sure You Want To Logout</div>
            <button className='btn' onClick={signOut}> click to confirm </button>
      </>
    );
}

export default Logout