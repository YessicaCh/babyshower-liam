const express = require('express');
const mongoose = require('mongoose');
const path  = require('path');

const bodyParser = require('body-parser');
const userRouters = require("./routes/user");
const giftRouters = require("./routes/gift");
const MongoClient = require('mongodb').MongoClient;
const morgan = require('morgan');
const multer = require('multer');
require('dotenv').config();
var db;
const collection = 'Gift';

const app = express();
const port  =  process.env.PORT || 9000;
//mongo conection 
//const MongoClient = require('mongodb').MongoClient;

//Settings
//app.use(express.static('/src/assets'));
//console.log('dirname : ',__dirname)
//app.use(express.static('assets'));
//app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'assets')))

app.set('View engine','ejs');
app.set('Views',path.join(__dirname,'views'));


//middlarewar
var storage = multer.diskStorage({
    destination :path.join(__dirname,'assets/dbImg'),
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(multer({
    storage,
    dest:path.join(__dirname,'assets/dbImg')
}).single('img'));
app.use(morgan('dev'));
//app.use(express.static(__dirname + '/public'));

MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log('Error: ' + err);
    db = client.db('myFirstDatabase')
})


// app.use(multer({ dest: ´./uploads/´,
//  rename: function (fieldname, filename) {
//    return filename;
//  },
// }));



mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('conect DB');
}).catch((error)=>{console.log(error)})

/*

var mongoUrl = 'mongodb://' + dbLogin.username + ':' + dbLogin.password + '@ds123625.mlab.com:23625/dj-quotes';

MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log('Error: ' + err);
    
    db = client.db('dj-quotes')
    app.listen(3000, function() {
        console.log('listen on 3000');
    });
})*/



//routes
app.get('/',(req,res) =>{
    console.log('collecction de datos')

    /*db.collection(collection).find().toArray(function(err, results) {
        console.log('collecction de datos')
        console.log(results)

        res.render(path.join(__dirname ,'/views/index.ejs'), {colorList: {}})
    })*/
    res.render(path.join(__dirname ,'/views/index.ejs'), {colorList: {}})
    //res.sendFile(path.join(__dirname ,'/views/index.ejs'));
    //res.sendFile('/views/index.html', { root: __dirname });
})
app.get('/add',(req,res) =>{
    res.sendFile(path.join(__dirname ,'/views/add.html'));
    //res.sendFile('/views/index.html', { root: __dirname });
})

app.get('/regalos',(req,res) =>{
    res.sendFile(path.join(__dirname ,'/views/gifts.html'));
    //res.sendFile('/views/index.html', { root: __dirname });
})

app.use('/api',userRouters)
app.use('/api',giftRouters)

app.listen(port,() => console.log('server list on port',port) );
