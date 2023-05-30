const express = require('express')
const path = require('path')
const app = express()
const engine = require('ejs-mate')
const dbConnection = require('./config/database')
const methodOverride = require('method-override')

const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError')
const joi = require('joi')

const clientTests = require('./models/clientTest')
const clients = require('./models/client');



// const clientTest = require('./models/clientTest')



dbConnection();
app.use(express.json());
// for ejs-mate 
app.engine('ejs', engine);
// for ejs 
app.set('view engine', 'ejs')
app.set('views', './views');
// for path 
app.use('/', express.static(path.join(__dirname, 'public')))
// for return req.body in the page 
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));
app.use('/', express.static(path.join(__dirname, 'frontend', 'build')))
// for update and delete (method override) 
app.use(methodOverride('_method'))

// for render the home page html file 


app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
})

app.get('/transformerOilTest', (req, res) => {
    res.sendFile('public/test/transformar.html', { root: __dirname })
})
app.get('/engineOilTest', (req, res) => {
    res.sendFile('public/test/engine.html', { root: __dirname })
})
app.get('/hydroulicOilTest', (req, res) => {
    res.sendFile('public/test/hydroulic.html', { root: __dirname })
})
app.get('/oilFiltration', (req, res) => {
    res.sendFile('public/test/Filtration.html', { root: __dirname })
})

// **************for test backend***************** \\

// all client show page \\
app.get('/allClient', catchAsync(async (req, res) => {
    const allClient = await clients.find({})
    res.render('client/allClient', { allClient })
}))

// for add new client \\
app.get('/allClient/newClient', (req, res) => {
    res.render('client/newClient')
})
app.post('/allClient', catchAsync(async (req, res) => {
    const client = new clients(req.body.allClient)
    await client.save();
    res.redirect(`/allClient/${client._id}`)
}))

// for show the client tests \\
app.get('/allClient/:id', catchAsync(async (req, res) => {
    const client = await clients.findById(req.params.id).populate('clientTest')

    res.render('client/clientTest', { client })
}))

// for edit client tests \\
app.get('/allClient/:id/edit', catchAsync(async (req, res) => {
    const client = await clients.findById(req.params.id)
    res.render('client/editClient', { client })
}))
app.put('/allClient/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const client = await clients.findByIdAndUpdate(id, { ...req.body.allClient })

    res.redirect(`/allClient/${client._id}`)
}))

// for delete the client \\ 
app.delete('/allClient/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await clients.findByIdAndDelete(id);
    res.redirect('/allClient')
}))



// for add new  job for the client \\
app.get('/allClient/:id/addjob', catchAsync(async (req, res) => {

    const client = await clients.findById(req.params.id)
    res.render('clientTest/addJob', { client })
}))

app.post('/allClient/:id/Jobs', catchAsync(async (req, res) => {

    const clientTest2 = new clientTests(req.body.clientTest);
    await clientTest2.save();
    const client = await clients.findByIdAndUpdate(req.params.id, { $push: { clientTest: clientTest2 } }, { new: true });
    res.redirect(`/allClient/${client._id}`);

}))

// for edit the jobs 
app.get('/allClient/:id/editJob/:jobID', catchAsync(async (req, res) => {
    const client = await clients.findById(req.params.id)
    const clientTest2 = await clientTests.findById(req.params.jobID)
    console.log(clientTest2);
    res.render('clientTest/editJob', { clientTest2, client })
}))

app.put('/allClient/:id/editJob/:jobID', catchAsync(async (req, res) => {

    await clientTests.findByIdAndUpdate(req.params.jobID, { ...req.body.clientTest })

    res.redirect(`/allClient/${req.params.id}`)
}))

// for show tests 
app.get('/allClient/clientTest/:jobID/tests', async (req, res) => {
    const clientTest2 = await clientTests.findById(req.params.jobID).populate()
    res.render('testShow', { clientTest2 })


})

// for add new test 




app.all('*', (req, res, next) => {
    next(new ExpressError('page not found', 404))
})

// for expressError
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = 'Somthing Wrong!!'
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
    console.log(`this is  port 3000`)
})