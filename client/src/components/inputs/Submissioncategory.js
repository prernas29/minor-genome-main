import React, { useState } from 'react';
import axios from "axios";
const Submissioncategory = ({ contract, account, provider }) => {
   
   const [submissionCategory, setSubmissionCategory] = useState('sequenced by submitter');
  
 

return(
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
);
}
export default Submissioncategory;