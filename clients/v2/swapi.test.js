process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const Swapi=require('./swapi')



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

    describe('When try to get all movies await version ', function () {
    this.timeout(3000)
        it('should return the movie A New Hope',(done) => {
            var test = null;

            test = async function () {
                movies = await swapi.Planet.getMovies('Taooine')
                console.log(movies)
                expect(movies).to.deep.include('A New Hope')
                done()

            }
            test()
        })
    })


    describe('When try to get appearences from Alderaan', function() {
        it.only(`should return ${appear} appearances`,(done) => {
            Swapi.Client.totalAppearances('Alderaan').then((appearances) => {
                    expect(appearances).to.equal(2)
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


    describe('When try to get appearances from ooince planet(non-existent)', () => {
        it.only(`should return ${zero} appearances`,(done) => {
            swapi.getAppearances('ooince',(err,res) => {
                if (err) {
                    expect.fail(err)
                }
                expect(res).to.equal(zero)
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
                expect(res).to.deep.include({title:'A New Hope'})
                done()
            })
        })
    })


    describe('When try to get movie from url await version ', () => {
        const urlmovie='https://swapi.co/api/films/1'

        it('should return the movie A New Hope',(done) => {
            var test = async function () {

                await swapi.Movie.getByUrl(urlmovie,(err,movie) =>{
                    expect(movie).to.deep.include({title:'A New Hope'})
                    done()
                })
            }
            test()
        })
    })







    describe('When try to get a planet', () => {
        it.only('should return a planet',(done) => {

                Swapi.Client.planetByName('Alderaan').then((res) => {
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

                Swapi.Client.planetByName('ad').then((res) => {
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

                    Swapi.Client.planetByName('Alderaan').then((res) => {
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

                    Swapi.Client.planetByName('ad').then((res) => {
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
