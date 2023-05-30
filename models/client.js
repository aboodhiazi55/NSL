const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const ClientSchema = new Schema({
    title: {
        type: String,
        required: true

    },
    location: String,
    image: String,
    clientTest: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ClientTest'
        }
    ]
})

module.exports = mongoose.model('Clients', ClientSchema)