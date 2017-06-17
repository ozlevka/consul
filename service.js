
const consul = require('consul')();
const os = require('os');
const _ = require('underscore');

const default_interface = 'eth0';
let serviceOptions = {};



function checkOptions() {
    if(!serviceOptions.name) {
        serviceOptions.name = os.hostname() + '-service';
    }

    if(!serviceOptions.id) {
        serviceOptions.id = os.hostname()
    }

    if(!serviceOptions.default_interface) {
        serviceOptions.default_interface = default_interface;
    }

    if(!serviceOptions.address) {
        serviceOptions.address = getServiceAddress();
    }

    if(!serviceOptions.port) {
        serviceOptions.port = 8080;
    }
}

function getServiceAddress() {
    const interfaces = os.networkInterfaces();
    const cand = _.filter(interfaces[serviceOptions.default_interface], (int) => {
        return int.family =='IPv4'
    });

    return cand[0].address;
}

module.exports.initService = function(options) {
    serviceOptions = options || {};
    checkOptions();
};


module.exports.getServiceInfo = function() {
    return serviceOptions;
};

module.exports.register = function(cb) {

};


module.exports.deregister = function(cb) {

};


module.exports.getServicesList = function(options, cb) {

};
