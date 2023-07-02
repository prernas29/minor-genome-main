import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import About from './About';
import Service from './Service';
import Footer from './Footer';
import useLogout from "../hooks/useLogout";
import useAuth from '../hooks/useAuth';
import "../Home.css"
const Navbar_herostart = () => {
  const { username } = useAuth().auth;
    const logout = useLogout();
    const navigate = useNavigate();

    const signOut = async () => {
      await logout();
      navigate("/home");
    };
    return (
      <>
        <div class="container-fluid position-relative p-0">
          <nav class="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
            <a href="" class="navbar-brand p-0">
              <h1 class="text-muted m-0">CryptoBox</h1>
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span class="fa fa-bars"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <div class="navbar-nav ms-auto py-0">
                <div class="nav-item dropdown">
                  {username ? (
                    <>
                      <Link to="/logout" style={{ marginRight: "2cm" }}>
                        Logout
                      </Link>

                      <Link to="/Upload" style={{ marginRight: "2cm" }}>
                        Upload Fasta{" "}
                      </Link>

                      <Link to="/Get" style={{ marginRight: "2cm" }}>
                        Dashboard({username})
                      </Link>
                      <Link to="/Share">Share</Link>
                    </>
                  ) : (
                    <>
                      <a href="/login" style={{ marginRight: "2cm" }}>
                        Login
                      </a>
                      <br />
                      <a href="/register" style={{ marginRight: "2cm" }}>
                        Register
                      </a>

                      <br />
                      <Link to="/Upload" style={{ marginRight: "2cm" }}>
                        Upload Fasta{" "}
                      </Link>
                      
                    </>
                  )}
                </div>
              </div>
            </div>
          </nav>

          <div class="container-fluid bg-primary py-5 mb-5 hero-header">
            <div class="container py-5">
              <div class="row justify-content-center py-5">
                <div class="col-lg-10 pt-lg-5 mt-lg-5 text-center">
                  <h1 class="display-3 text-white mb-3 animated slideInDown">
                    CryptoBox
                  </h1>
                  <p class="fs-4 text-white mb-4 animated slideInDown">
                    An Ethereum based Dapp for storing and sharing data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
export default Navbar_herostart;
