'use strict';

const {
    getAllFromStorage,
    getOneFromStorage, 
    addToStorage,
    updateStorage,
} = require('./jsonStorage/storageLayer');

// getAllFromStorage().then(console.log).catch(console.log);

// getOneFromStorage(2).then(console.log).catch(console.log);

const car = {
    "productNumber": "210",
    "model": "Fila",
    "maxspeed": "3456",
    "rating": "**",
    "year": "1000"
}

// addToStorage(car).then(console.log).catch(console.log);

const carUpdated = {
    "productNumber": "210",
    "model": "FilaXXX",
    "maxspeed": "3456XXX",
    "rating": "**XX",
    "year": "1000X"
}

updateStorage(carUpdated)
    .then(console.log).catch(console.log);

// removeFromStorage(2).then(console.log).catch(console.log);