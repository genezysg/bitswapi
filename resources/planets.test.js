process.env.NODE_ENV = 'test';

const chai = require('chai')
const chaiHttp= require('chai-http')
const expect = chai.expect
const server=require('../server')
const statuscode=require('http-status-codes')
const Planet = require('../models/planet.js')


const pln=new Planet({
                        name:'Alderaan',
                        climate:'deserto',
                        terrain:'areia'
                    })

const createdPlanet = new Promise((resolve,reject) => {
    pln.save((err,saved) => {
        if (err) {
            reject(err)
        }
        resolve(saved.id)
    })
})



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



    createdPlanet.then((planetId) => {
            describe('#delete - when an id is sent to be deleted',() => {
            it('should delete the planet',(done) => {
                chai.request(server).delete(`/planets/${planetId}`)
                .then((res) => {
                    expect(res).to.have.status(statuscode.NO_CONTENT)
                    done()
                })
                .catch((err) => {
                    expect.fail(err,null,err)
                    done()
                })
            })
        })
    }).catch((err) => {
        expect.fail(err)
        done()
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
