const mongoose = require('mongoose');
const dbConnection = () => {
    main().catch(err => console.log(err));

    async function main() {
        await mongoose.connect('mongodb://127.0.0.1:27017/NSL-test');
        console.log('database connected!!');
    }
}

module.exports = dbConnection