'use strict';

const { CODES, MESSAGES } = require('./statuscodes');

const {
    getAllFromStorage,
    getOneFromStorage, 
    addToStorage,
    updateStorage,
    removeFromStorage
} = require('./storageLayer');

// Datastorage class

module.exports = class Datastorage{
    
    get CODES() {
        return CODES;
    } // getter end

    getAll() {
        return getAllFromStorage();
    } // getAll end

    getOne(productNumber) {
        return new Promise(async (resolve, reject) => {
            if (!productNumber) {
                reject(MESSAGES.NOT_FOUND('--empty--'));
            } else {
                const result = await getOneFromStorage(productNumber);
                if (result) {
                    resolve(result);
                } else {
                    reject(MESSAGES.NOT_FOUND(productNumber));
                }
            }
        })
    } // getOne end

    insert(car) {
        return new Promise(async (resolve, reject) => {
            if (car) {
                if (!car) {
                    reject(MESSAGES.NOT_INSERTED());
                } else if (await getOneFromStorage(car.productNumber)) {
                    reject(MESSAGES.ALREADY_IN_USE(car.productNumber));
                } else if (await addToStorage(car)) {
                    resolve(MESSAGES.INSERT_OK(car.productNumber));
                } else {
                    reject(MESSAGES.NOT_INSERTED());
                }
            } else {
                reject(MESSAGES.NOT_INSERTED(productNumber));
            }
        });
    } // insert end

    update(car) {
        return new Promise(async (resolve, reject) => {
            if (car) {
                if (await updateStorage(car)) {
                    resolve(MESSAGES.UPDATE_OK(car.productNumber)); 
                } else {
                    reject(MESSAGES.NOT_UPDATED());
                }
            } else {
                reject(MESSAGES.NOT_UPDATED());
            }
        });
    } // update end

    remove(productNumber) {
        return new Promise(async (resolve, reject) => {
            if (!productNumber) {
                 reject(MESSAGES.NOT_INSERTED('--empty--'));
                } else if (await removeFromStorage(productNumber)) {
                    resolve(MESSAGES.REMOVE_OK(productNumber));
                } else {
                reject(MESSAGES.NOT_REMOVED(productNumber));
            }
        });
    } // remove end
}