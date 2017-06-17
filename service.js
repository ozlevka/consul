
const os = require('os');
let host = undefined;
if(process.env.CONSUL_ADDRESS) {
    host = {host:process.env.CONSUL_ADDRESS}
}
const consul = require('consul')(host);
const _ = require('underscore');
const Puid = require('puid');

let serviceOptions = {};

const puid = new Puid();



function checkOptions() {
    if(!serviceOptions.name) {
        serviceOptions.name = os.hostname() + '-service';
    }

    if(!serviceOptions.id) {
        serviceOptions.id = puid.generate();
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
    const arr = _.flatten(_.values(interfaces));
    const cand = _.filter(arr, (obj) => {
        return obj.family =='IPv4' && !obj.internal;
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
    consul.agent.service.register(this.getServiceInfo(), cb);
};


module.exports.deregister = function(cb) {
    consul.agent.service.deregister(this.getServiceInfo(), cb);
};


module.exports.getServicesList = function(options, cb) {
    consul.agent.service.list(cb);
};


module.exports.getServiceNodes = function(options, cb) {
    let name = serviceOptions.name;
    if(options && options.name) {
        name = options.name
    }
    consul.catalog.service.nodes(name, cb);
};
