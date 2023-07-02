import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
import FormData from 'form-data'

import { ethers } from "ethers";
import { useEffect } from "react";
import Upload from "../../artifacts/contracts/Upload.sol/Upload.json";

function App() {
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
        setAccount(address);
        let contractAddress = "0x5EA063d0A19B7182BBD1F5F08a3Eb8858cb1Fb01";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  //   
}








//import fs from 'fs'
const FileUpload = ({ contract, account, provider }) => {
  const [sourceModifierTableFile, setSourceModifierTableFile] = useState(null);
  const [visibility, setVisibility] = useState('public');
  const [submissionCategory, setSubmissionCategory] = useState('sequenced by submitter');
  const [submissionReleaseDate, setSubmissionReleaseDate] = useState('');
  const [sequenceMoleculeType, setSequenceMoleculeType] = useState('');
  const [sequencingTechnology, setSequencingTechnology] = useState('');
  const [researchDefinition, setResearchDefinition] = useState("");
  const [sequenceAuthors, setSequenceAuthors] = useState({ firstName: "", lastName: "" });
  const [publicationStatus, setPublicationStatus] = useState({ referenceTitle: "", status: "" });
  const [contact, setContact] = useState({ firstName: "", lastName: "", email: "" });
  const [option, setOption] = useState('option1');
  const REGISTER_URL = "http://localhost:3500/Submissions";
  



  const handleubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      visibility,
      submissionCategory,
      submissionReleaseDate,
      sequenceMoleculeType,
      sequencingTechnology,
      researchDefinition,
      sequenceAuthors,
      contact,
      option

    });

        try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ researchDefinition, sequenceAuthors,publicationStatus,contact,visibility,submissionCategory,sequenceMoleculeType,sequencingTechnology }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      console.log(JSON.stringify(response));
      
      //clear state and controlled inputs
      //need value attrib on inputs for this
     
    } catch (err) {
          console.log(err);
    }
  };

  


  const [file1, setFile] = useState(null);
  const [fileName, setFileName] = useState("No File Selected");
  const handleSubmit = async (e) => {
    e.preventDefault();

     if (file1) {


      const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjMzYxZmI3NC0wYmMwLTRmYmUtYjVlNi1mMThmMjVhZGNlMzciLCJlbWFpbCI6ImdhdXRhbTM0NTYzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI2OThmMzFiNzM1ZDIyNjllYWEwZiIsInNjb3BlZEtleVNlY3JldCI6ImRiYTU0NWNiMDE4ZWU1ZDZjOGViYzYzNmMxNmVmMWQ5NzlkMDFiZTVkMWM2ODI2ZTFkNzZiMWVlMGRlYzNiMzIiLCJpYXQiOjE2Nzc1NDYyNDl9.G2lX8OeZTtm0ZR9LrN31TBKWLqng0denA3TVg-17_5Q'


      const formData = new FormData();
      const src = file1;

      //const file = fs.createReadStream(src)
      formData.append('file', src)

      const metadata = JSON.stringify({
        name: fileName,
      });
      formData.append('pinataMetadata', metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      })
      formData.append('pinataOptions', options);
      console.log(formData);
      try {
        const resFile = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
          maxBodyLength: "Infinity",
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: JWT
          }
        });
        console.log(resFile.data);
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        const signer = contract.connect(provider.getSigner());
        signer.add(account, ImgHash);
        alert("File Successfully Uploaded");
      } catch (error) {
        console.log(error);
      }





    }

    setFileName("No File selected");
    setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  const handleOptionChange = (event) => {
    setOption(event.target.value);
  };
  return (
    <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div class="container">
        <div class="booking p-5">
          <div class="row g-5 align-items-center">
            <div class="col-md-6 text-white" style={{ marginLeft: "6.5cm" }}>
              <h6 class="text-white text-uppercase">Enter Genomic Sequence</h6>
              <div>
                <div>
                  <div class="container-fluid position-relative p-0">
                    <nav class="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
                      <label htmlFor="option">Select an option:</label>
                      <select
                        id="option"
                        class="btn btn-outline-light w-100 py-3"
                        name="option"
                        value={option}
                        onChange={handleOptionChange}
                      >
                        <option> select </option>
                        <option value="visibility">visibility</option>
                        <option value="submission category">
                          submission category
                        </option>
                        <option value="submission release date">
                          submission release date
                        </option>
                        <option value="sequenceMoleculeType">
                          sequence Molecule Type
                        </option>


                        <option value="Sequence authors">
                          Sequence authors
                        </option>

                        <option value="Contact">Contact</option>
                      </select>
                    </nav>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="top">
                    <form className="form" onSubmit={handleSubmit}>
                      <label
                        htmlFor="file-upload"
                        className="choose"
                        class="btn btn-outline-light w-100 py-3"
                      >
                        Choose File
                      </label>
                      <input
                        disabled={!account}
                        type="file"
                        id="file-upload"
                        name="data"
                        onChange={retrieveFile}
                      />
                      <span className="textArea" class="text-light">
                        File: {fileName}
                      </span>
                      <button
                        type="submit"
                        className="upload"
                        disabled={!file1}
                        class="btn btn-outline-light py-3 px-5 mt-2"
                      >
                        Upload File
                      </button>
                      <br></br>
                    </form>
                    <form onSubmit={handleubmit}>
                      {option === "visibility" && (
                        <div>
                          <label htmlFor="visibility">Visibility</label>
                          <select
                            class="form-control bg-light"
                            id="visibility"
                            value={visibility}
                            onChange={(event) =>
                              setVisibility(event.target.value)
                            }
                          >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                          </select>
                        </div>
                      )}
                      {option === "submission category" && (
                        <div>
                          <div class="">
                            <label>Submission category</label>
                            <div>
                              <label htmlFor="sequencedBySubmitter">
                                <input
                                  type="radio"
                                  id="sequencedBySubmitter"
                                  name="submissionCategory"
                                  value="sequenced by submitter"
                                  checked={
                                    submissionCategory ===
                                    "sequenced by submitter"
                                  }
                                  onChange={(event) =>
                                    setSubmissionCategory(event.target.value)
                                  }
                                />
                                Sequenced by submitter
                              </label>
                            </div>
                            <div>
                              <label htmlFor="derivedFromOtherData">
                                <input
                                  type="radio"
                                  id="derivedFromOtherData"
                                  name="submissionCategory"
                                  value="derived from other data"
                                  checked={
                                    submissionCategory ===
                                    "derived from other data"
                                  }
                                  onChange={(event) =>
                                    setSubmissionCategory(event.target.value)
                                  }
                                />
                                Derived from other data
                              </label>
                            </div>
                          </div>
                        </div>
                      )}

                      {option === "submission release date" && (
                        <div>
                          <div class="">
                            <label
                              className=""
                              htmlFor="submissionReleaseDate"
                            >
                              Submission release date
                            </label>
                            <br></br>
                            <input
                              type="date"
                              id="submissionReleaseDate"
                              value={submissionReleaseDate}
                              onChange={(event) =>
                                setSubmissionReleaseDate(event.target.value)
                              }
                            />
                          </div>
                        </div>
                      )}

                      {option === "sequenceMoleculeType" && (
                        <div>
                          <div className="">
                            <div className="">
                              <label htmlFor="sequenceMoleculeType">
                                Sequence (molecule type, topology)
                              </label>
                              <br></br>
                              <input
                                type="text"
                                id="sequenceMoleculeType"
                                class="form-control bg-light"
                                value={sequenceMoleculeType}
                                onChange={(event) =>
                                  setSequenceMoleculeType(event.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {option === "sequencingTechnology" && (
                        <div>
                          <label htmlFor="sequencingTechnology">
                            Sequencing technology
                          </label>
                          <br></br>
                          <input
                            type="text"
                            class="form-control bg-light"
                            id="sequencingTechnology"
                            onChange={(event) =>
                              setSequencingTechnology(event.target.value)
                            }
                          />
                        </div>
                      )}

                      {option == "Research definition" && (
                        <label>
                          Research definition
                          <br></br>
                          <input
                            type="text"
                            class="form-control bg-light"
                            value={researchDefinition}
                            onChange={(event) =>
                              setResearchDefinition(event.target.value)
                            }
                          />
                        </label>
                      )}
                      {option == "Sequence authors" && (
                        <label>
                          Sequence authors (first name, last name)
                          <input
                            type="text"
                            class="form-control bg-light"
                            value={sequenceAuthors.firstName}
                            onChange={(event) =>
                              setSequenceAuthors((prevState) => ({
                                ...prevState,
                                firstName: event.target.value,
                              }))
                            }
                            placeholder="First Name"
                          />
                          <br></br>
                          <input
                            type="text"
                            class="form-control bg-light"
                            value={sequenceAuthors.lastName}
                            onChange={(event) =>
                              setSequenceAuthors((prevState) => ({
                                ...prevState,
                                lastName: event.target.value,
                              }))
                            }
                            placeholder="Last Name"
                          />
                        </label>
                      )}
                      {option == "Publication status" && (
                        <label>
                          Publication status (reference title, status)
                          <br></br>
                          <input
                            type="text"
                            class="form-control bg-light"
                            value={publicationStatus.referenceTitle}
                            onChange={(event) =>
                              setPublicationStatus((prevState) => ({
                                ...prevState,
                                referenceTitle: event.target.value,
                              }))
                            }
                            placeholder="Reference Title"
                          />
                          <br></br>
                          <input
                            type="text"
                            class="form-control bg-light"
                            value={publicationStatus.status}
                            onChange={(event) =>
                              setPublicationStatus((prevState) => ({
                                ...prevState,
                                status: event.target.value,
                              }))
                            }
                            placeholder="Status"
                          />
                        </label>
                      )}
                      {option == "Contact" && (
                        <label>
                          Contact (first name, last name, email)
                          <input
                            type="text"
                            class="form-control bg-light"
                            value={contact.firstName}
                            onChange={(event) =>
                              setContact((prevState) => ({
                                ...prevState,
                                firstName: event.target.value,
                              }))
                            }
                            placeholder="First Name"
                          />
                          <br></br>
                          <input
                            type="text"
                            class="form-control bg-light"
                            value={contact.lastName}
                            onChange={(event) =>
                              setContact((prevState) => ({
                                ...prevState,
                                lastName: event.target.value,
                              }))
                            }
                            placeholder="Last Name"
                          />
                          <br></br>
                          <input
                            type="text"
                            class="form-control bg-light"
                            value={contact.email}
                            onChange={(event) =>
                              setContact((prevState) => ({
                                ...prevState,
                                email: event.target.value,
                              }))
                            }
                            placeholder="Email"
                          />
                        </label>
                      )}
                      
                      <button
                        type="submit"
                        class="btn btn-outline-light w-100 py-3"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FileUpload;

// import { useState } from "react";
// import axios from "axios";
// import "./FileUpload.css";
// function FileUpload({ contract, provider, account }) {
//   // const [urlArr, setUrlArr] = useState([]);
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("No image selected");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (file) {
//         try {
//           const formData = new FormData();
//           formData.append("file", file);

//           const resFile = await axios({
//             method: "post",
//             url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//             data: formData,
//             headers: {
//               pinata_api_key: `95f328a012f1634eab8b`,
//               pinata_secret_api_key: `8ea64e6b39c91631c66128a7c0e0dde35a6fbdf797a8393cc5ba8bf8d58e9b54`,
//               "Content-Type": "multipart/form-data",
//             },
//           });

//           const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
//           const signer = contract.connect(provider.getSigner());
//           signer.add(account, ImgHash);

//           //setUrlArr((prev) => [...prev, ImgHash]);

//           //Take a look at your Pinata Pinned section, you will see a new file added to you list.
//         } catch (error) {
//           alert("Error sending File to IPFS");
//           console.log(error);
//         }
//       }

//       alert("Successfully Uploaded");
//       setFileName("No image selected");
//       setFile(null); //to again disable the upload button after upload
//     } catch (error) {
//       console.log(error.message); //this mostly occurse when net is not working
//     }
//   };
//   const retrieveFile = (e) => {
//     const data = e.target.files[0];
//     console.log(data);

//     const reader = new window.FileReader();

//     reader.readAsArrayBuffer(data);
//     reader.onloadend = () => {
//       setFile(e.target.files[0]);
//     };
//     setFileName(e.target.files[0].name);
//     e.preventDefault();
//   };
//   return (
//     <div className="top">
//       <form className="form" onSubmit={handleSubmit}>
//         <label htmlFor="file-upload" className="choose">
//           {/*turn around for avoding choose file */}
//           Choose Image
//         </label>
//         <input
//           disabled={!account} //disabling button when metamask account is not connected
//           type="file"
//           id="file-upload"
//           name="data"
//           onChange={retrieveFile}
//         />
//         <span className="textArea">Image: {fileName}</span>
//         {/* choose file */}
//         <button type="submit" disabled={!file} className="upload">
//           Upload file
//         </button>
//       </form>
//     </div>
//   );
// }

// export default FileUpload;
