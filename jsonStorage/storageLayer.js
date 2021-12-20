'use strict';

const path = require('path');

const {readStorage, writeStorage} = require('./readerWriter');

const { storageFile, adapterFile } = require('./storageConfig.json');
const { adapt } = require(path.join(__dirname, adapterFile));
const storageFilePath = path.join(__dirname, storageFile);

async function getAllFromStorage() {
    return readStorage(storageFilePath);
}

async function getOneFromStorage(productNumber) {
    const storage = await readStorage(storageFilePath);
    return storage.find(car=> car.productNumber == productNumber) || null;  // changing undefined to null. Null is an actual value. Undefined means nobody touched it.
}

async function addToStorage(newObject) { // does not check if the object exists already (id)
    const storage = await readStorage(storageFilePath);
    storage.push(adapt(newObject));  // adapt changes str to int
    return await writeStorage(storageFilePath, storage);
}

async function updateStorage(updatedObject) {
    const storage = await readStorage(storageFilePath);
    const oldObject = storage.find(car => car.productNumber == updatedObject.productNumber);
    console.log(oldObject);
    if (oldObject) {  // doing nothing if we dont find the object
        // The Object.assign() method copies all enumerable own properties from one or more source objects to a target object. It returns the modified target object.
        // Object.assign(target, source);
        Object.assign(oldObject, adapt(updatedObject));
        return await writeStorage(storageFilePath, storage);
    }
    return false;
}

async function removeFromStorage(productNumber) {
    const storage = await readStorage(storageFilePath);
    const i = storage.findIndex(item => item.productNumber == productNumber);
    if (i < 0) return false;  // index not found
    storage.splice(i,1);  //take one object away starting at position i
    return await writeStorage(storageFilePath, storage);
}
    

module.exports = {getAllFromStorage, getOneFromStorage, addToStorage, updateStorage, removeFromStorage};