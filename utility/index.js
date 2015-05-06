var config = require('../config');

function printObject(obj) {
    for(prop in obj) {
        console.log(obj[prop]);
    }
}

exports.printObject = printObject;
