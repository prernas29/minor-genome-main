import Upload from "../artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
// import "./Modal.css"
import useAuth from "./hooks/useAuth";
import Navbar_herostart from "./inputs/Navbar_herostart";
import Footer from "./inputs/Footer";

const Modal = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const auth = useAuth();
  
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
  

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5EA063d0A19B7182BBD1F5F08a3Eb8858cb1Fb01";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer,
        );
        console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    setModalOpen(false);
  };
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);

  return (
    <>
    <Navbar_herostart></Navbar_herostart>
    <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s"> 
      <div class="container">
        <div class="booking p-5">
          <div class="row g-5 align-items-center">
            <div class="col-md-6 text-white" style={{marginLeft:"8cm"}}>
      <h1 style={{color:"white"}}>Welcome { auth.auth.username}</h1>
      
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              
              
              placeholder="Enter Address"
            ></input>
          </div>
          <br></br>
          <br></br>
          <form id="myForm">
            <select id="selectNumber">
          
              <option className="address">People With Access</option>
            </select>
          </form>
          
          <div className="footer">
            <br></br>
            <br></br>
            
            <button onClick={() => sharing()} class="btn btn-outline-light py-3 px-5 mt-2">Share</button>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
     <Footer></Footer>
    </>
  );
};
export default Modal;
