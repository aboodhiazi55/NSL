const express = require('express')
const path = require('path')
const app = express()
const engine = require('ejs-mate')


// for ejs-mate 
app.engine('ejs', engine);

app.set('view engine', 'ejs')
app.set('views', './views');
app.use('/', express.static(path.join(__dirname, 'public')))

app.use(express.static(__dirname + '/public'));
app.use('/', express.static(path.join(__dirname, 'frontend', 'build')))


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




app.get('/main', (req, res) => {
    res.render('public/views/trans')
})



app.get('/transformerOilTest', (req, res) => {
    res.sendFile('public/views/transformerTest.html', { root: __dirname })
})



app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})