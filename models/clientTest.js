const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const ClientTestSchema = new Schema({
    jobNumber: Number,
    nslNumber: Number,
    clients: String,
    sampleDate: Date,
    totalNumberOfSample: Number,
    typeOfSample: String,
    recipipent: String,
    resiponsibili: String,
    testType: String,
    tests: [
        {
            type: Schema.Types.ObjectId,
            ref: 'tests'
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model('ClientTest', ClientTestSchema)