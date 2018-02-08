process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const swapi=require('./swapi')



describe('SwapiClient',() => {
    const appear=2
    const zero=0

    describe('When try to get appearences from Alderaan', function() {
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
        it(`should return ${zero} appearances`,(done) => {
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
                }
                expect(res).to.deep.include({title:'A New Hope'})
                done()
            })
        })
    })


    describe('When try to get a planet', () => {
        it('should return a planet',(done) => {
            swapi.Planet.getByName('Alderaan',(err,res) => {
                if (err) {
                    expect.fail(null,err,err)
                }
                expect(res).to.deep.include({name:'Alderaan'})
                done()
            })
        })
    })

})
