

const assert = require('assert');
const util = require('util');



describe('Require consul', () => {
    it("should import consul module and print", () => {
        const consul = require('../service');
        console.log(util.inspect(consul));
    });
});


describe("API test", () => {
    const consul = require('../service');
    describe("Service info", () => {
        it('should make default system info', () => {
            consul.initService({default_interface:'wlp2s0'});

            console.log(util.inspect(consul.getServiceInfo()))
        });
    });

    describe("Register", () => {
        it('should register in consul. (require consul run)', (done) => {
            consul.register({name: "hello"}, (err, res) => {
                if(err) {
                    done(err);
                } else {
                    console.log(util.inspect(res));
                    done();
                }
            });
        });
    });

    describe("Deregister", () => {
        it('should deregister hello service', (done) => {
            consul.deregister({name: 'hello'}, (err, res) => {
                if(err) {
                    done(err);
                } else {
                    console.log(util.inspect(res));
                    done();
                }
            });
        })
    })
});
