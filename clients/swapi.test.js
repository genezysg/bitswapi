process.env.NODE_ENV = 'test';

const chai = require('chai');
const {expect} = chai.expect;
const swapi=require('./swapi')

const appear=2

it(`should return ${appear} appearances`,(done) => {
    swapi.getAppearances('Alderaan',(err,res) => {
        if (err) {
            expect.fail(err)
        }
        expect(res).to.be.equal(appear)
        done()
    })
})

const zero=0

it(`should return ${zero} appearances`,(done) => {
    swapi.getAppearances('ooince',(err,res) => {
        if (err) {
            expect.fail(err)
        }
        expect(res).to.be.equal(zero)
        done()
    })
})
