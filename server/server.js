const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const multer = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    }
  })
const upload = multer({storage:storage});
const fs = require('fs');
  


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const user = 'adm';


mongoose.connect('mongodb://localhost:27017/RB2', {useNewUrlParser: true});
const clientes = require('./models/clientes');

var dashboard;
const das = require('./dashboard');
das.precios((e)=>{
    dashboard = e;
    console.log(dashboard);
})
    

app.get('/app/lista/completa',(req,res)=>{
    let busqueda;
    if(user!='adm'){
        busqueda = { "ciudad": "Santa Cruz", "ultima_visita": { $exists: true }, $or: [ { "distribuye": true }, { "distribuye": false } ] }
    }
    else{
        busqueda = { "ultima_visita": { $exists: true }, $or: [ { "distribuye": true }, { "distribuye": false } ] }
    }
    clientes.find(busqueda,{ "nombre": 1, "direccion": 1, "ultima_visita": 1},{sort:{ "ultima_visita": -1}})
    .then((cli)=>{
        res.send(cli);
    })
});

app.get('/app/lista/parcial',(req,res)=>{
    let busqueda;
    if(user!='adm'){
        busqueda = { "ciudad": "Santa Cruz", "ultima_visita": { $exists: true }, $or: [ { "distribuye": true }, { "distribuye": false } ] }
    }
    else{
        busqueda = { "ultima_visita": { $exists: true }, $or: [ { "distribuye": true }, { "distribuye": false } ]}
    }
    clientes.find(busqueda,{ "nombre": 1, "direccion": 1, "ultima_visita": 1},{sort:{ "ultima_visita": -1},limit:30})
    .then((cli)=>{
        res.send(cli);
    })
});

app.get('/app/dasboard',(req,res)=>{
    res.send(dashboard);
});

app.get('/app/cliente/:id',async (req,res)=>{
    let id = req.param('id');
    let cli = await clientes.findById(id)
    res.send(cli)
})

app.post('/app/registro',async (req,res)=>{
    console.log(req.body);
    res.send('sssssss')
})
app.post('/app/upload',upload.any(),(req,res)=>{
    console.log(req.files)
    fs.renameSync(req.files[0].path,req.files[0].path+'.jpg');
    res.send('listo')
})

app.listen(PORT, function(){
    console.log('Server is running on Port: ',PORT);
  });