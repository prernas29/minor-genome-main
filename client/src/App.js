import "./App.css";
import {  Routes, Route } from "react-router-dom";
import Upload from "./Upload";
import Home from "./components/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import RequireAuth from "./components/RequireAuth";
import Layout from "./Layout";
import PersistLogin from "./components/PersistLogin";
import Users from "./components/Users";
import Display from "./components/Display";
import Modal from "./components/Modal";
import Submissioncategory from "./components/inputs/Submissioncategory";
import Spinner from "./components/inputs/Spinner";
import Navbar_herostart from "./components/inputs/Navbar_herostart";
import About from "./components/inputs/About";
import Footer from "./components/inputs/Footer";
import Service from "./components/inputs/Service";
import Booking from "./components/inputs/Booking";
import Logout from "./components/Logout";
import "./css/style.css";
import "./css/bootstrap.min.css";
const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {


  return (
    <Routes>
      <Route path="/" element={<Layout></Layout>}>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Random" element={<Navbar_herostart />}></Route>
        <Route exact path="/logout" element={<Logout></Logout>}></Route>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route exact path="/Upload" element={<Upload />} />
            <Route exact path="/Get" element={<Display></Display>}></Route>
            <Route exact path="/Share" element={<Modal></Modal>}></Route>
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route exact path="/Users" element={<Users />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
