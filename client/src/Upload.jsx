import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

import Modal from "./components/Modal";
import "./App.css"
import useAuth from "./components/hooks/useAuth";
import Navbar_herostart from "./components/inputs/Navbar_herostart";
import FileUpload from "./components/inputs/FileUpload";
import Footer from "./components/inputs/Footer";

function Main() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState({});

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
        console.log(auth.auth.address.includes(address));
        if (auth.auth.address.includes(address)) {
          
          setAccount(address);
        }
        else {
          setAccount("Not Connected: Please Connect The Metamask's Account You Used For Registration");
        }
        let contractAddress = "0x5EA063d0A19B7182BBD1F5F08a3Eb8858cb1Fb01";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
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
  const auth = useAuth();

  return (
        <> <Navbar_herostart></Navbar_herostart>
       



      <div className="App">
        <h1>Welcome { auth.auth.username}</h1>
            <h1 style={{ color: "black" }}>
              
            </h1>
            <div class="bg"></div>
            <div class="bg bg2"></div>
            <div class="bg bg3"></div>

            <p style={{ color: "black" }}>
              Account : {account ? account : "Not connected"}
            </p>
             <FileUpload
              account={account}
              provider={provider}
              contract={contract}
            ></FileUpload> 
          </div>
          <Footer></Footer>
        </>

  );
}

export default Main;
