process.env.NODE_ENV = 'test';

const chai = require('chai')
const chaiHttp= require('chai-http')
const {expect} =chai.expect
const server=require('../server')
const statuscode=require('http-status-codes')

chai.use(chaiHttp)



c

it('should return a list of planets in a json format',(done) => {
    chai.request(server).get('/planets')
    .end((err,res) => {
        if (err) {
            expect.fail(err,'error')
        }
        expect(res).to.have.status(statuscode.Ok);
        expect(res).to.be.json;
        done()
    })
})



it('should insert a new planet',(done) => {
    chai.request(server).post('/planets')
    .send({
        name:'Alderaan',
        climate:'desert',
        terrain:'mountais'
    })
    .then((res) => {
        expect(res).to.have.status(statuscode.Created);
        expect(res).to.be.json;
        done()
    })
})



it('should update a planet',(done) => {

    chai.request(server).post('/planets/5a78be54d5ad6a2846b572fb')
    .send({
        name:'Tatooine',
        climate:'watery',
        terrain:'mountais'
    })
    .then((res) => {
        expect(res.body).to.deep.include({
            climate:'watery',
            terrain:'mountais'
        });
        done()
    })
    .catch((err) => {
        expect.fail(err)
        done()
    })
})
