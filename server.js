const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = 'mongodb+srv://dima:dima160302@cluster0.ysizroi.mongodb.net/node?retryWrites=true&w=majority'
const Post = require('./models/posts');

mongoose
    .connect(db)
    .then((res) => console.log("Connected to DB"))
    .catch((error) => console.log(error));

app.use(express.static(__dirname + '/'));

app.use(express.json({ extended: true, limit: '1mb' }))

app.post('/submit-form', function (request, response) {
    const { typeClean, typeRoom, areaRoom, addition, name, tel, price } = request.body;

    const post = new Post({ typeClean, typeRoom, areaRoom, addition, name, tel, price });

    let nameCorrect = checkName(name);
    let telCorrect = checkTel(tel);

    if(!(nameCorrect && telCorrect)){
        response.status(400).json();
        return;
    }

    post
        .save()
        .catch((error) => {
            console.log(error);
        });

    response.status(200).json();

});

app.listen(3000, "127.0.0.1", () => {
    console.log(`Server running at http://127.0.0.1:3000/`);
})

function checkName(name) {
    let re = /^[а-яіїєґА-ЯІЇЄҐ'`a-zA-Z]{0,20}$/;

    return re.test(name);
}

function checkTel(tel) {
    let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[- \s\.]?[0-9]{4}$/;

    return re.test(tel);
}