const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

app.set('view engine', 'ejs')
/*app.get('/', (req, res) => {
 // res.send('hello world')
   res.sendFile(__dirname + '/index.html')
})*/
app.use(express.static('public'))
//app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
/*app.post('/quotes', (req, res) => {
  console.log(req.body)
})*/

var db

MongoClient.connect('mongodb://schoolsms:sms2017@ds157509.mlab.com:57509/schoolsms', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(5000, () => {
    console.log('listening on 5000')
  })
})


//res.render(view, locals)

app.get('/', (req, res) => {

  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

/*app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'manikandan'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})*/
/*app.post('/quotes', (req, res) => {
  console.log('Hellooooooooooooooooo!')
})

app.listen(5000, function() {
  console.log('listening on 5000')
})*/