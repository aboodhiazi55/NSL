const mongoose = require('mongoose');
const clients = require('../models/client');

const clientTest = require('../models/clientTest');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/NSL-test');
    console.log('database connected!!');
}


const seedDB = async () => {
    await clients.deleteMany({})
    const c = new clients({ title: 'aboood', location: 'Amman', image: 'https://images.unsplash.com/photo-1631899483253-c8de3fb3d4db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80' })
    c.save()
}

seedDB()

const testDB = async () => {
    await clientTest.deleteMany({})
    const c = new clientTest({
        jobNumber: 1,
        nslNumber: 1,
        clients: 'nsl',
        sampleDate: 11 / 12 / 2023,
        totalNumberOfSample: 15,
        typeOfSample: 'minral-oil',
        recipipent: 'abood',
        resiponsibili: 'ENG',
        testType: 'DGA'
    })
    c.save()
}
testDB()