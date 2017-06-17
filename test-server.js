
const http = require('http');
const consul = require('./service');

consul.initService({name: 'web-server'});


const requestHandler = (req, res) => {
    res.end(JSON.stringify(consul.getServiceInfo()));
};


const server = http.createServer(requestHandler);


server.listen(8080, (err) => {
    if(err) {
        console.error(err);
    } else {
        consul.register((err) => {
            if(err) {
                console.error("Error register to discovery" + err);
                process.exit(1);
            } else {
                console.log("Server up and registered");
            }
        })
    }
});
