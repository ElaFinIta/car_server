'use strict';

const http = require('http');
const path = require('path');

const express = require('express');
const app = express();

const {port, host, storage} = require('./serverConfig.json');

const Datastorage = require(path.join(__dirname, storage.storageFolder, storage.dataLayer));

const dataStorage = new Datastorage();

const server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pageviews'));

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

const menuPath = path.join(__dirname, 'menu.html');
app.get('/', (req,res) => res.sendFile(menuPath));

app.get('/all', (req, res) => dataStorage.getAll()
    .then(data => res.render('allCars', {result: data})));

app.get('/getCar', (req, res) => res.render('getCar', {
    title: 'Get',
    header: 'Get',
    action: '/getCar'
}));

app.post('/getCar', (req, res) => {
    if (!req.body) res.sendStatus(500);

    const productNumber = req.body.productNumber;
    dataStorage.getOne(productNumber)
        .then(car => res.render('carPage', {result: car}))
        .catch(error => sendErrorPage(res,error));
});

app.get('/remove', (req, res) => res.render('getCar', {
    title: 'Remove',
    header: 'Remove a car',
    action: '/remove'
}));

app.post('/remove', (req, res) => {
    if(!req.body) res.sendStatus(500);
    const productNumber = req.body.productNumber;
    dataStorage.remove(productNumber)
        .then(status => sendStatusPage(res, status))
        .catch(error => sendErrorPage(res, error));
});

// sending the form
app.get('/inputform', (req, res) => res.render('form', {
    title: 'Add car',
    header: 'Add a new car',
    action: '/insert',
    productNumber: {value: '', readonly: ''},
    model: {value: '',  readonly: ''},
    maxspeed: {value: '', readonly: ''},
    rating: {value: '', readonly: ''},
    year: {value: '', readonly: ''},
}));

// submitting
app.post('/insert', (req, res) => {
    if (!req.body) res.sendStatus(500);
    dataStorage.insert(req.body)
        .then(status => sendStatusPage(res, status))
        .catch(error => sendErrorPage(res, error));
});


// sending the form: you can only put data in ID field, to get the car you want to modify/update
app.get('/updateform', (req, res) => res.render('form', {
    title: 'Update car',
    header: 'Update car information',
    action: '/updatedata',
    productNumber: {value: '', readonly: ''},
    model: {value: '',  readonly: 'readonly'},
    maxspeed: {value: '', readonly: 'readonly'},
    rating: {value: '', readonly: 'readonly'},
    year: {value: '', readonly: 'readonly'},
}));

//  only productNumber field is read-only mode
app.post('/updatedata', (req, res) => {
    if (!req.body) res.sendStatus(500);
    dataStorage.getOne(req.body.productNumber)
        .then(car => res.render('form', {
            title: 'Update car',
            header: 'Update car data',
            action: '/update',
            productNumber: {value: car.productNumber, readonly: 'readonly'},
            model: {value: car.model,  readonly: ''},
            maxspeed: {value: car.maxspeed, readonly: ''},
            rating: {value: car.rating, readonly: ''},
            year: {value: car.year, readonly: ''},
        }))
        .catch(error => sendErrorPage(res, error));
});



app.post('/update', (req, res) => {
    if (!req.body) res.sendStatus(500);
    dataStorage.update(req.body)
        .then(status => sendStatusPage(res, status))
        .catch(error => sendErrorPage(res, error));
});

server.listen(port, host, () => console.log(`${host}:${port} serving...`));

function sendErrorPage(res, error, title='Error', header='Error') {
    sendStatusPage(res, error, title, header)
}

function sendStatusPage(res, status, title='Status', header='Status') {
    return res.render('statusPage', {title, header, status});
};