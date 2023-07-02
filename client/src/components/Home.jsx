import React from 'react';
import "./Home.css"
import NavBar from './Navbar';
import useAuth from './hooks/useAuth';
import "./inputs/Navbar_herostart"
import Navbar_herostart from './inputs/Navbar_herostart';
import About from './inputs/About';
import Service from './inputs/Service';
import Footer from './inputs/Footer';
function Home() {
  const { username } = useAuth().auth;
  

  return (
  
   <>
   <Navbar_herostart>   </Navbar_herostart>
  

        
    
    <About></About>
        <Service></Service>
    <Footer></Footer>
    </>
  );
}

export default Home;
