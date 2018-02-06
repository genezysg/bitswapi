process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const swapi=require('./swapi')



describe('SwapiClient',() => {
    const appear=2
    const zero=0

    describe('When try to get appearences from Alderaan', () => {
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



    describe('When try to get from ooince planet(non-existent)', () => {
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

})
