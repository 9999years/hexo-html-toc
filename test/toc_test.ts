import { assert, expect, should } from 'chai'
should()

import { Heading } from '../src/toc'

describe('Heading', function() {
    describe('#constructor()', function() {
        it('Should have a level of 1', function() {
            new Heading().should.have.property('level', 1)
        })
    })
})
