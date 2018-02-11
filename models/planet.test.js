process.env.NODE_ENV = 'test';


const chai = require('chai')
const expect = chai.expect
const Planet = require('./planet')
const mongoose=require('../mongoose/connect')



before(function (done) {
    this.timeout(10000)

    Planet.remove({},() => {
        done()
    })
})

describe('Model - Planet',function () {
    this.timeout(3000)
    it('should update and save appearances of a planet', (done) => {
        var expValue=2
        alderaan=new Planet({name:'Alderaan'})

        alderaan.updateAppearances()
        .then((qt) => {
            expect(qt).to.equal(expValue)
            expect(alderaan.movieAppearances).to.equal(expValue)
            done()
        })
        .catch((err) => console.log(err))
    })

    this.timeout(10000)
    it('should update and save movies of a planet', (done) => {
        tatooine=new Planet({name:'Tatooine'})
        tatooine.updateMovies()
        .then((movies) => {
            expect(tatooine.movies).to.deep.include('Attack of the Clones')
            expect(tatooine.movies).to.deep.include('A New Hope')
            expect(movies).to.deep.include('Return of the Jedi')
            done()
        })
        .catch((err) => console.log(err))
    })

    it('should have no movies', (done) => {
        var exval=0
        andro=new Planet({name:'Andro'})
        andro.updateMovies()
        .then((movies) => {
            expect(andro.movies.length).to.equal(exval)
            expect(movies.length).to.equal(exval)
            done()
        })
    })



    it('should have no appearances', (done) => {
        var exval=0
        mirial=new Planet({name:'Mirial'})
        mirial.updateAppearances()
        .then((total) => {
            expect(mirial.movieAppearances).to.equal(exval)
            expect(total).to.equal(exval)

            done()
        })
    })
})
