process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const Swapi=require('./swapi')

const swapiClient=new Swapi.Client()

var testData;

describe('SwapiClientV2',() => {
    const appear=2
    const zero=0


    describe('When try to get all movies await version ', function () {
    this.timeout(3000)
        it('should return the movie A New Hope',(done) => {
            var test = null;

            test = async function () {
                movies = await swapi.Planet.getMovies('Tatooine')
                console.log(movies)
                expect(movies).to.deep.include('A New Hope')
                done()

            }
            test()
        })
    })

    testData={
        planet:'Tatooine',
        expected: [ 'Attack of the Clones',
  'The Phantom Menace',
  'Revenge of the Sith',
  'Return of the Jedi',
  'A New Hope' ]
    }
    describe(`When try to get all movies from a planet ${testData.planet}`, function () {
    this.timeout(5000)
        it.only(`should return the movie ${testData.expected}`,(done) => {
            swapiClient.moviesByPlanet(testData.planet).then((movies) => {
                    expect(movies).to.deep.equal(testData.expected)

                    done()
            })
            .catch((err) => console.log(err))
                
        })
    })

    describe(`When try to get all movies from a planet ${testData.planet}`, function () {
    this.timeout(5)
        it.only(`should return the movie ${testData.expected}`,(done) => {
            swapiClient.moviesByPlanet(testData.planet).then((movies) => {
                    expect(movies).to.deep.equal(testData.expected)

                    done()
            })
            .catch((err) => console.log(err))
                
        })
    })


    describe('When try to get appearences from Alderaan', function() {
        it.only(`should return ${appear} appearances`,(done) => {
            swapiClient.totalAppearances('Alderaan').then((appearances) => {
                    expect(appearances).to.equal(2)
                    done()
            })
            .catch((err) => expect.fail(null,err,err))
        })
    })

        describe('When try to get appearences from non-existent planet', function() {
        it.only(`should return zero appearances`,(done) => {
            swapiClient.totalAppearances('ad').then((appearances) => {
                    expect(appearances).to.equal(0)
                    done()
            })
            .catch((err) => expect.fail(null,err,err))
        })
    })

    const timeout=5
    describe(`When try to get appearences from Alderaan under ${timeout}ms (cached)`, function() {
        this.timeout(timeout);
        it(`should return ${appear} appearances`,(done) => {
            swapi.getAppearances('Alderaan',(err,res) => {
                if (err) {
                    expect.fail(err)
                }
                expect(res).to.equal(appear)
                done()
            })
        })
    })





    describe('When try to get movie from url ', () => {
        const urlmovie='https://swapi.co/api/films/1'

        it('should return the movie A New Hope',(done) => {
            swapi.Movie.getByUrl(urlmovie,(err,res) => {
                if (err) {
                    expect.fail(err)
                    done()
                }
                expect(res).to.deep.include('A New Hope')
                done()
            })
        })
    })


    describe('When try to get movie from url ', () => {
        it.only('should return a movie',(done) => {
                const urlmovie='https://swapi.co/api/films/1'

                  swapiClient.movieByURL(urlmovie).then((movie) => {
                    expect(movie).to.equal('A New Hope')
                    done()
                })
                .catch((err) => {
                    console.log(err)
                    expect.fail(null,err,err)
                    done()
                })
        })
    })







    describe('When try to get a planet', () => {
        it.only('should return a planet',(done) => {

                swapiClient.planetByName('Alderaan').then((res) => {
                    expect(res).to.deep.include({name:'Alderaan'})
                    done()
                })
                .catch((err) => {
                    expect.fail(null,err,err)
                    done()
                })
        })
    })

    describe('When try to get a planet that doesnt exist', () => {
        it.only('should return a error',(done) => {

                swapiClient.planetByName('ad').then((res) => {
                    expect.fail(res)
                    done()
                })
                .catch((err) => {
                    expect(err.message).to.equal('NOTFOUND')
                    done()
                })
        })
    })



        describe('When try to get a planet', () => {
            it.only('should return a planet',(done) => {

                    swapiClient.planetByName('Alderaan').then((res) => {
                        expect(res).to.deep.include({name:'Alderaan'})
                        done()
                    })
                    .catch((err) => {
                        expect.fail(null,err,err)
                        done()
                    })
            })
        })

        describe('When try to get a planet that doesnt exist', () => {
            it.only('should return a error',(done) => {
                    swapiClient.planetByName('ad').then((res) => {
                        expect.fail(res)
                        done()
                    })
                    .catch((err) => {
                        expect(err.message).to.equal('NOTFOUND')
                        done()
                    })
            })
        })


})
