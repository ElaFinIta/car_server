'use strict';

const fs = require('fs').promises;

async function readStorage(storageFilePath) {
    try {
        const data = await fs.readFile(storageFilePath, 'utf8');
        return JSON.parse(data);
    } catch(err) {
        // console.log(err.message);
        return []
    }
}

async function writeStorage(storageFilePath, data) {
    try {
        // 4 spaces for indentation in the file
        await  fs.writeFile(storageFilePath, JSON.stringify(data, null, 4), {
            encoding: 'utf8',
            flag: 'w'  // 'e' means appending, but would append after the end of the array in the json. So we are always overwriting ('w') the whole file. So we have the all file read in memory. Only applicable to small file
        })
        return true
    } catch {
        // console.log(err.message);
        return false;
    }
}

module.exports = {readStorage, writeStorage};