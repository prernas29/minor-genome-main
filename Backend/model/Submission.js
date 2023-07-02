const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    visibility: {
        type: String,
    },
    submissionCategory: {
        type: String,
    },

    sequenceMoleculeType: {
        type: String,
    },
    sequencingTechnology: {
        type: String,
    },
    researchDefinition: {
        type: String,
    },
    contact: {
        firstName: String,
        email: String,
        
    },
    
    
});

module.exports = mongoose.model("Submissions", submissionSchema);
