'use strict';

function adapt(item) {
    // console.log('carAdapter');
    return Object.assign(item, {
        productNumber: +item.productNumber,
        maxspeed: +item.maxspeed,  // also: Number(item.maxspeed)
        year: +item.year
    });
}

module.exports = { adapt }

