import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
import FormData from 'form-data'

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


  const handleubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log({
      researchDefinition,
      sequenceAuthors,
      publicationStatus,
      contact,
    });
  };
  const [file1, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
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
              try{
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
                alert("Successfully Image Uploaded");
              } catch (error) {
                console.log(error);
              }

          
            
          

    }
    
    setFileName("No image selected");
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
  
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose File
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file1}>
          Upload File
        </button>
      </form>
      <form onSubmit={handleubmit}>

      <div>
        <label htmlFor="visibility">Visibility</label>
        <select id="visibility" value={visibility} onChange={(event) => setVisibility(event.target.value)}>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
      <div>
        <label>Submission category</label>
        <div>
          <label htmlFor="sequencedBySubmitter">
            <input type="radio" id="sequencedBySubmitter" name="submissionCategory" value="sequenced by submitter" checked={submissionCategory === 'sequenced by submitter'} onChange={(event) => setSubmissionCategory(event.target.value)} />
            Sequenced by submitter
          </label>
        </div>
        <div>
          <label htmlFor="derivedFromOtherData">
            <input type="radio" id="derivedFromOtherData" name="submissionCategory" value="derived from other data" checked={submissionCategory === 'derived from other data'} onChange={(event) => setSubmissionCategory(event.target.value)} />
            Derived from other data
          </label>
        </div>
      </div>
      <div>
        <label htmlFor="submissionReleaseDate">Submission release date</label>
        <input type="date" id="submissionReleaseDate" value={submissionReleaseDate} onChange={(event) => setSubmissionReleaseDate(event.target.value)} />
      </div>
      <div>
        <label htmlFor="sequenceMoleculeType">Sequence (molecule type, topology)</label>
        <input type="text" id="sequenceMoleculeType" value={sequenceMoleculeType} onChange={(event) => setSequenceMoleculeType(event.target.value)} />
      </div>
      <div>
        <label htmlFor="sequencingTechnology">Sequencing technology</label>
        <input type="text" id="sequencingTechnology" value={sequencingTechnology} onChange={(event) => setSequencingTechnology(event.target.value)} />
      </div>

      <label>
        Research definition
        <input type="text" value={researchDefinition} onChange={(event) => setResearchDefinition(event.target.value)} />
      </label>

      <label>
        Sequence authors (first name, last name)
        <input
          type="text"
          value={sequenceAuthors.firstName}
          onChange={(event) => setSequenceAuthors((prevState) => ({ ...prevState, firstName: event.target.value }))}
          placeholder="First Name"
        />
        <input
          type="text"
          value={sequenceAuthors.lastName}
          onChange={(event) => setSequenceAuthors((prevState) => ({ ...prevState, lastName: event.target.value }))}
          placeholder="Last Name"
        />
      </label>

      <label>
        Publication status (reference title, status)
        <input
          type="text"
          value={publicationStatus.referenceTitle}
          onChange={(event) =>
            setPublicationStatus((prevState) => ({ ...prevState, referenceTitle: event.target.value }))
          }
          placeholder="Reference Title"
        />
        <input
          type="text"
          value={publicationStatus.status}
          onChange={(event) => setPublicationStatus((prevState) => ({ ...prevState, status: event.target.value }))}
          placeholder="Status"
        />
      </label>

      <label>
        Contact (first name, last name, email)
        <input
          type="text"
          value={contact.firstName}
          onChange={(event) => setContact((prevState) => ({ ...prevState, firstName: event.target.value }))}
          placeholder="First Name"
        />
        <input
          type="text"
          value={contact.lastName}
          onChange={(event) => setContact((prevState) => ({ ...prevState, lastName: event.target.value }))}
          placeholder="Last Name"
        />
        <input
          type="text"
          value={contact.email}
          onChange={(event) => setContact((prevState) => ({ ...prevState, email: event.target.value }))}
          placeholder="Email"
        />
      </label>

      <button type="submit">Submit</button>




      
    </form>

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
