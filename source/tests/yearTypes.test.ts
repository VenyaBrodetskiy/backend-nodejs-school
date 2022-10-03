import { checkyear } from '../test-src/yearTypes';
import { expect } from 'chai';

describe('Year tests', () => {

    it('1. check regular not leap', () => {
        let notLeap = checkyear(1919);
        expect(notLeap).to.be.false;
    })

    it('2. check leap not century end', () => {
        let notCenturyEnd = checkyear(2020);
        expect(notCenturyEnd).to.be.true;
    })

    it('3. check century end', () => {
        let centuryEnd = checkyear(1900);
        expect(centuryEnd).to.be.false;
    })

    it('4. check millenium', () => {
        let millenium = checkyear(2000);
        expect(millenium).to.be.true;
    })
})