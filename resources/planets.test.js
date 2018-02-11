process.env.NODE_ENV = 'test';

const chai = require('chai')
const chaiHttp= require('chai-http')
const expect = chai.expect

const server=require('../server')
const statuscode=require('http-status-codes')
const Planet = require('../models/planet')


chai.use(chaiHttp)




describe('Planets API', () => {



describe('#post', function () {

    it('should insert a new planet',(done) => {
        chai.request(server).post('/planets')
        .send({
            name:'Alderaan',
            climate:'desert',
            terrain:'mountais'
        })
        .end((err,res) => {
            expect(err).to.be.an('null')
            expect(res).to.have.status(statuscode.CREATED);
            expect(res.body).to.deep.include({name:'Alderaan'})
            done()
        })
    })


    it('should not insert an existing  planet with the same name',(done) => {
        new Planet({
            name:'Kamino',
            climate:'chuvoso',
            terrain:'terrenoseco'
        }).save()
        .then(() => {
            chai.request(server).post('/planets')
            .send({
                name:'Kamino',
                climate:'desert',
                terrain:'mountais'
            })
            .end((err,res) => {
                expect(err).to.have.status(statuscode.UNPROCESSABLE_ENTITY);
                expect(res.body).to.equal('Already Exists')
                done()
            })
        })
    })
})

describe('#get',() => {
        it('should return a planet by id',(done) => {
        new Planet({
            name:'Dagobah',
            climate:'tester',
            terrain:'terrenoseco'
        }).save()
                .then((planet) => {
                    chai.request(server).get(`/planets/${planet.id}`)
                    .end((err,res) => {
                        expect(err).to.be.an('null')
                        expect(res).to.have.status(statuscode.OK);
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.deep.include({name:'Dagobah'})
                        done()
                        })
                    })
        })


        it('should return a list of planets in a json format',(done) => {
            chai.request(server).get('/planets')
            .end((err,res) => {
                expect(err).to.be.an('null')
                expect(res).to.have.status(statuscode.OK);
                expect(res.body).to.be.an('array')
                expect(res.body[2]).to.deep.include({name:'Andro'})
                done()
            })
        })
})


describe('#get - when an inexistent id is sent',() => {
        it('should return 404',(done) => {
            chai.request(server).get(`/planets/noplanet`)
            .end((err,res) => {
                expect(err.message).to.equal('Not Found')
                expect(res).to.have.status(statuscode.NOT_FOUND);
                done()
                })

        })
})


describe('#put' ,() => {
    it('should update a planet',(done) => {
        new Planet({
            name:'Geonosis',
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


     it('should not update a non-existent planet',(done) => {

         chai.request(server).put('/planets/34234')
         .send({
             name:'Tatooineya',
             terrain:'mountais'
         })
         .end((err) => {
             expect(err).to.have.status(statuscode.NOT_FOUND)
             done()
         })

      })


     it('should not update a planet with an already existent name',(done) => {
         new Planet({
             name:'Mirial',
             climate:'chuvoso',
             terrain:'terrenoseco'
         }).save()
         .then((planet) => {
                     chai.request(server).put(`/planets/${planet.id}`)
                     .send({
                         name:'Alderaan',
                         terrain:'mountais'
                     })
                     .end((err,res) => {
                         expect(err).to.have.status(statuscode.UNPROCESSABLE_ENTITY)
                         expect(res.body).to.equal('Planet Already Exists')
                         done()
                     })
             })
      })
})


    describe('#delete - when an id is sent to be deleted',() => {

        it('should delete the planet',(done) => {
            new Planet({
                name:'Utapau',
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
