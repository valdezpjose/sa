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
const dbURI = 'mongodb+srv://valdezpjose:JayusAsterion1.@biblioteca.svgbn.mongodb.net/auth?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then((result)=> app.listen(4000, ()=>{
        console.log('Conectado a la db auth');
        console.log('Puerto 4000');
    }))
    .catch((err)=> console.log(err));


app.get('/me', (req,res)=>{
    var token = req.headers['x-access-token'];
    if(!token) return res.status(401).send({ auth: false, message: 'No se encuentra un token.' });

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Fallo al momento de autenticar el token.' });       
        
        User.findById(decoded.id, (err, user) => {
            if (err) return res.status(500).send("Hubo un problema encontrando el usuario.");
            if (!user) return res.status(404).send("Usuario inexistente.");
            
            res.status(200).send(user);
          });

      });
});


app.post('/login', (req,res)=>{
    
    const {email,password} = req.body;
    User.findOne({ email: email }, (err, user) => {
        if (err) return res.status(500).send('Error en el server.');
        if (!user) return res.status(404).send('No existe el usuario.');
        

        if(password != user.password) return res.status(404).send("La contraseña es incorrecta");

        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // 24 horas
        });
        
        res.status(200).send({ auth: true, token: token });
      });

});

app.get('/logout',(req,res)=>{
    res.status(200).send({ auth: false, token: null });
});

app.post('/events',(req,res)=>{
    console.log('Evento recibido',req.body.type);
    
    res.send({});
});