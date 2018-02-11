process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const Swapi=require('./swapi')

const swapiClient=new Swapi.Client()

const timeout=5000
const timeoutCached=5

describe('SwapiClient',() => {
    describe('Test non-cached results',() => {

        describe('When try to get a planet Tatooine', function() {
            this.timeout(timeout)
            it('should return a planet',(done) => {
                swapiClient.planetByName('Tatooine').then((res) => {
                        expect(res).to.deep.include({name:'Tatooine'})
                        done()
                    })
                    .catch((err) => {
                        expect.fail(null,err,err)
                        done()
                    })
            })
        })

        describe('When try to get a planet that doesnt exist', function() {
            this.timeout(timeout)
            it('should return a error',(done) => {
                    swapiClient.planetByName('None').then((res) => {
                        expect.fail(res)
                        done()
                    })
                    .catch((err) => {
                        expect(err.message).to.equal('NOTFOUND')
                        done()
                    })
            })
        })

        describe('When try to get movie from url ', function () {
            this.timeout(timeout)
            it('should return a movie',(done) => {
                      swapiClient.movieByURL('https://swapi.co/api/films/1').then((movie) => {
                        expect(movie).to.equal('A New Hope')
                        done()
                    })
                    .catch((err) => {
                        expect.fail(null,err,err)
                        done()
                    })
            })
        })


        describe('When try to get movie from url that dont exist ', function () {
            this.timeout(timeout)
            it('should return undefined',(done) => {
                      swapiClient.movieByURL('https://swapi.co/api/films/9999').then((movie) => {

                        expect(movie).to.equal(undefined)
                        done()
                    })
                    .catch((err) => {
                        expect(err.message).to.equal('NOTFOUND')
                        done()
                    })
            })
        })


        describe('When try to get appearences from Alderaan', function() {
            this.timeout(timeout)
            it('should return 2 appearances',(done) => {
                swapiClient.totalAppearances('Alderaan').then((appearances) => {
                        expect(appearances).to.equal(2)
                        done()
                })
                .catch((err) => expect.fail(null,err,err))
            })
        })

        testData={
            appear:0,
            planet:'ooine'
        }
        describe('When try to get appearences from ooine', function() {
                this.timeout(timeout)
            it('should return 0  appearances',(done) => {
                swapiClient.totalAppearances('ooine').then((appearances) => {
                        expect(appearances).to.equal(0)
                        done()
                })
                .catch((err) => expect.fail(null,err,err))
            })
        })

        describe('When try to get all movies from a planet Tatooine', function () {
            this.timeout(timeout)
            it('should return the movies',(done) => {
                var expected=['Attack of the Clones','The Phantom Menace','Revenge of the Sith','Return of the Jedi','A New Hope']
                swapiClient.moviesByPlanet('Tatooine').then((movies) => {
                        expect(movies).to.deep.equal(expected)

                        done()
                })
                .catch((err) => expect.fail(null,err,err))

            })
        })
    })

    describe('Test cached planet and movies from Alderaan in less than 5ms', function() {
        this.timeout(timeoutCached)
        it('should return the movies',(done) => {
            var expected=['Revenge of the Sith','A New Hope']
            swapiClient.moviesByPlanet('Alderaan').then((movies) => {
                    expect(movies).to.deep.equal(expected)
                    done()
            })
            .catch((err) => expect.fail(null,err,err))

        })
    })
})
