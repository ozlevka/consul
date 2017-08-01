

const assert = require('assert');
const util = require('util');



describe('Require consul', () => {
    it("should import consul module and print", () => {
        const consul = require('../service');
        console.log(util.inspect(consul));
    });
});


describe("Test service nodes", () => {
    const consul = require('../service');
    it("should print all nodes where run consul service", (done) => {
        consul.getServiceNodes({name: 'shield-squid'}, (err, res) => {
            if(err) {
                done(err);
            } else {
                console.log(util.inspect(res));
                done();
            }
        })
    });
});


describe("API test", () => {
    const consul = require('../service');
    consul.initService({name:"hello-test"});
    describe("Register And Deregister", () => {
        it('should register in consul. (require consul run)', (done) => {
            console.log("Register...")
            consul.register((err) => {
                if(err) {
                    done(err);
                } else {
                    done();
                }
            });
        });

        it("shoul get list service from consul and print", (done) => {
            console.log("Print list");
            consul.getServicesList({}, (err, res) => {
                if (err) {
                    done(err);
                } else {
                    console.log(util.inspect(res));
                    done();
                }
            })
        });

        it('should print service nodes list', (done) => {
            consul.getServiceNodes({}, (err, res) =>{
                if(err) {
                    done(err);
                } else {
                    console.log(util.inspect(res));
                    done();
                }
            });
        });

        it('should deregister hello service', (done) => {
            console.log("Deregister...");
            consul.deregister((err) => {
                if(err) {
                    done(err);
                } else {
                    done();
                }
            });
        })
    });
});
