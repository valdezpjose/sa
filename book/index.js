const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');


var config = require('./config');
const Book = require('./book-model');


const app = express();
app.use(bodyParser.json());
app.use(cors());


const dbURI = 'mongodb+srv://valdezpjose:JayusAsterion1.@biblioteca.svgbn.mongodb.net/book?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then((result)=> app.listen(4002, ()=>{
        console.log('Conectado a la db book');
        console.log('Puerto 4002');
    }))
    .catch((err)=> console.log(err));


app.post('/new',(req,res)=>{
    const{name,author,synopsis,genre,editorial,image,stock,price} = req.body
    Book.create({
        name:name,
        author: author,
        synopsis: synopsis,
        genre: genre,
        editorial: editorial,
        image: image,
        stock: stock,
        price: price
    },
    (err,book)=>{
        if(err) return res.status(500).send(err) // error crear libro
        res.status(200).send({"action":"Libro creado"})     
    });
});

app.get('/all', (req,res)=>{
    Book.find({},(err,books)=>{

        res.send(books);
    });
});

app.post('/update', async (req,res)=>{
    const {name,editorial,data} = req.body
    const book = await Book.findOne({ 
        name: name,
        editorial: editorial
    });

    if(book){
        await Book.updateOne({ 
            name: name,
            editorial: editorial
        }, data);
        return res.status(200).send({"action":"Libro actualizado"});
    }else{
        return res.status(404).send('No existe el usuario.');
    }

});

app.post('/delete', async (req,res)=>{
    const {name,editorial} = req.body
    const book = await Book.findOne({ 
        name: name,
        editorial: editorial
    });

    if(book){
        await Book.deleteOne({ 
            name: name,
            editorial: editorial
        });
        return res.status(200).send({"action":"Libro eliminado"});
    }else{
        return res.status(404).send('No existe el usuario.');
    }

});



app.post('/filter',async (req,res)=>{
    const data = req.body;
    const book = await Book.find(data);

    res.send(book);
});


app.post('/get',async (req,res)=>{
    const {name,editorial} = req.body
    const book = await Book.findOne({ 
        name: name,
        editorial: editorial
    });

    if(book){
        return res.status(200).send(book);
    }else{
        return res.status(404).send('No existe el usuario.');
    }
});


module.exports = app.listen(3002);