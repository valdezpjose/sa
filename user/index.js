const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');


var config = require('./config');
const User = require('./user-model');


const app = express();
app.use(bodyParser.json());
app.use(cors());

// conexion mongo db
const dbURI = 'mongodb+srv://valdezpjose:JayusAsterion1.@biblioteca.svgbn.mongodb.net/user?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then((result)=> app.listen(4001, ()=>{
        console.log('Conectado a la db user');
        console.log('Puerto 4001');
    }))
    .catch((err)=> console.log(err));


app.get('/all',(req,res)=>{
    User.find({},(err,users)=>{

        res.send(users);
    });
});


app.get('/allClients',(req,res)=>{
    User.find({type: "cliente"},(err,users)=>{

        res.send(users);
    });
});


app.get('/allEditorials',(req,res)=>{
    User.find({type: "editorial"},(err,users)=>{

        res.send(users);
    });
});

app.get('/me', (req,res)=>{
    var token = req.headers['x-access-token'];
    if(!token) return res.status(401).send({ auth: false, message: 'No se encuentra un token.' });

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) return res.status(404).send({ auth: false, message: 'Fallo al momento de autenticar el token.' });       
        User.findById(decoded.id, (err, user) => {
            if (err) return res.status(404).send("Hubo un problema encontrando el usuario.");
            if (!user) return res.status(404).send("Usuario inexistente.");
            
            res.status(200).send(user);
          });

      });
});


app.post('/id', async (req,res)=> {
    const {email} = req.body
    const user = await User.findOne({ email: email });
    
    if(user){
        return res.status(200).send({id:user._id});
    }else{
        return res.status(404).send('No existe el usuario.');
    }

});


app.post('/login', (req,res)=>{
    
    const {email,password} = req.body;
    User.findOne({ email: email }, (err, user) => {
        if (err) return res.status(404).send('Error en el server.');
        if (!user) return res.status(404).send('No existe el usuario.');
        

        if(password != user.password) return res.status(404).send("La contraseña es incorrecta");

        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // 24 horas
        });
        
        res.status(200).send({ auth: true, token: token });
      });

});

app.post('/updateUser', async (req,res)=>{
    const {email,data} = req.body
    const user = await User.findOne({ email: email });
    
    if(user){
        await User.updateOne({ email: email }, data);
        return res.status(200).send('Usuario actualizado');
    }else{
        return res.status(404).send('No existe el usuario.');
    }

});

app.post('/deleteUser', async (req,res)=>{
    const {email} = req.body
    const user = await User.findOne({ email: email });
    
    if(user){
        await User.deleteOne({ email: email });
        return res.status(200).send('Usuario eliminado');
    }else{
        return res.status(404).send('No existe el usuario.');
    }

});

app.post('/register',(req,res)=>{

    User.find({email:req.body.email}).then(exist =>{
 
        if(exist.length > 0){
            res.status(404).send({error: "Correo ya existente"});
        }else{
            
            if(req.body.type === "cliente"){
                const {name,lastName,email,password,telephone} = req.body;
                User.create({
                    name: name,
                    lastName: lastName,
                    email: email,
                    password: password,
                    telephone:  telephone,
                    status: "activo",
                    type:"cliente",
                    token: "null"
                },
                (err,user)=>{
                    if(err) return res.status(404).send(err) // error crear usuario
            
                    var token = jwt.sign({id: user._id}, config.secret,{
                        expiresIn: 3600 // 1 hora expira
                    });
            
                    res.status(200).send({auth:true, token:token})
                });
            } 
            else if(req.body.type  == "editorial"){
                const {name,email,password,address} = req.body;
        
                User.create({
                    name: name,
                    email: email,
                    password: password,
                    address:  address,
                    status: "inactivo",
                    type:"editorial"
                },
                (err,user)=>{
                    if(err) return res.status(404).send(err) // error crear usuario
            
                    var token = jwt.sign({id: user._id}, config.secret,{
                        expiresIn: 3600 // 1 hora expira
                    });
            
                    res.status(200).send({auth:true, token:token})
                });
                    
            }
            else {
                res.status(404).send({error:"Tipo de usuario invalido"});
            }
        }
    });

});

app.get('/logout',(req,res)=>{
    res.status(200).send({ auth: false, token: null });
});

app.post('/events',(req,res)=>{
    console.log('Evento recibido',req.body.type);
    
    res.send({});
});