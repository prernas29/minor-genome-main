import { useState, useEffect } from "react";
import Upload from "../artifacts/contracts/Upload.sol/Upload.json";
import { ethers } from "ethers";
import "./Display.css";
import useAuth from "./hooks/useAuth";
import Navbar_herostart from "./inputs/Navbar_herostart";
import Footer from "./inputs/Footer";

const Display = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
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
        if (auth.auth.address.includes(address)) {
          setAccount(address);
        }
        else {
          setAccount(
            "Not Connected: Please Connect The Metamask's Account You Used For Registration",
          );
        }
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
  const [data, setData] = useState("");
  const [data2, setData2] = useState("");
  const auth = useAuth();
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        alert("Enter the address of the account you want to see");
      }
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      console.log(str_array);
      // console.log(str);
      // console.log(str_array);
      const Files = str_array.map((item, i) => {
        return (
          <ul>
            <a
              href={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              key={i}
              target="_blank"
            >
              item no {i}
            </a>
          </ul>
        );
      });
      setData2(Files);
    } else {
      alert("No Files to display");
    }
  };
  const getYourData = async () => {
    let dataArray;
    try {
      dataArray = await contract.display(account);
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      console.log(str_array);
      // console.log(str);
      // console.log(str_array);
      const Files = str_array.map((item, i) => {
        return (
          <ul>
            <a
              href={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              key={i}
              target="_blank"
            >
              item no {i}
            </a>
          </ul>
        );
      });
      setData(Files);
    } else {
      alert("No Files to display");
    }
  };
  return (
    <>
      <Navbar_herostart></Navbar_herostart>

      <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div class="container">
          <div class="booking p-5">
            <div class="row g-5 align-items-center">
              <div class="col-md-6 text-white" style={{ marginLeft: "8cm" }}>
                <h1
                  style={{
                    color: "white",
                  }}
                >
                  {" "}
                  Welcome {auth.auth.username}
                </h1>
                <br></br>
                Account : {account ? account : "Not connected"}
                <br></br>
                <br></br>
                <button
                  className="center button"
                  onClick={getYourData}
                  class="btn btn-outline-light py-3 px-5 mt-2"
                >
                  {" "}
                  Get Your Data{" "}
                </button>
                <br></br> <br></br>
                <div className="">{data}</div>
                <input
                  type="text"
                  placeholder="Enter Address"
                  class="container form-control bg-transparent"
                  className="address"
                ></input>
                <br></br> <br></br>
                <button
                  className="center button"
                  onClick={getdata}
                  class="btn btn-outline-light py-3 px-5 mt-2"
                >
                  Get other user's data
                </button>
                <div className="">{data2}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};
export default Display;
