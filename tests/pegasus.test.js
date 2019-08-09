const request = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const pegasus = require('../pegasus');
chai.use(chaiHttp);

describe('POST /api/propowner/', function () {
    it('Receives a response from server on POST', function (done) {
        let test = {
            scheme: "flats",
        }
        request(pegasus)
            .post('/api/propowner')
            .send(test)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('scheme');
            done();
        });
    });
});