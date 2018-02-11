process.env.NODE_ENV = 'test';

const chai = require('chai')
const chaiHttp= require('chai-http')
const expect = chai.expect

const server=require('../server')
const statuscode=require('http-status-codes')
const Planet = require('../models/planet.js')


chai.use(chaiHttp)

describe('Planets API', () => {

    it('should return a list of planets in a json format',(done) => {
        chai.request(server).get('/planets')
        .then((res) => {
            expect(res).to.have.status(statuscode.OK);
            expect(res.body).to.be.an('array')
            done()
        })
        .catch((err) => {
            expect.fail(err)
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
            expect(res).to.have.status(statuscode.CREATED);
            expect(res.body).to.deep.include({name:'Alderaan'})
            done()
        })
        .catch((err) => {
            expect.fail(err)
            done()
        })
    })



describe('#get - when an id is sent via url',() => {
        it('should return a planet by id',(done) => {
        new Planet({
            name:'Tatooine',
            climate:'tester',
            terrain:'terrenoseco'
        }).save()
                .then((planet) => {
                    chai.request(server).get(`/planets/${planet.id}`)
                    .end((err,res) => {
                        expect(err).to.be.an('null')
                        expect(res).to.have.status(statuscode.OK);
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.deep.include({name:'Tatooine'})
                        done()
                        })
                    })
        })
})


describe('#put' ,() => {
    it('should update a planet',(done) => {
        new Planet({
            name:'Tatooine',
            climate:'chuvoso',
            terrain:'terrenoseco'
        }).save()
        .then((planet) => {
                    chai.request(server).put(`/planets/${planet.id}`)
                    .send({
                        name:'Tatooiney',
                        terrain:'mountais'
                    })
                    .end((err,res) => {
                        expect(err).to.be.an('null')
                        expect(res.body).to.deep.include({
                            name:'Tatooiney',
                            climate:'chuvoso',
                            terrain:'mountais'
                        })
                        done()
                    })
            })
     })
})


    describe('#delete - when an id is sent to be deleted',() => {

        it('should delete the planet',(done) => {
            new Planet({
                name:'Tatooine',
                climate:'chuvoso',
                terrain:'terrenoseco'
            }).save()
            .then((planet) => {
                    chai.request(server).delete(`/planets/${planet.id}`)
                    .end((err,res) => {
                        expect(err).to.be.an('null')
                        expect(res).to.have.status(statuscode.NO_CONTENT)
                        done()
                    })
            })
        })
    })


    describe('#delete - when an inexistent id is sent to be deleted', () => {
        it('should return 404 not found',(done) => {
            chai.request(server).delete('/planets/dontexist')
            .then((res) => {
                expect.fail(res)
                done()
            })
            .catch((err) => {
                expect(err).to.have.status(statuscode.NOT_FOUND)
                done()
            })
        })
    })
})
