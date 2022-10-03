import { DateHelper } from '../helpers/date.helper';
import { expect } from 'chai';

describe('Test Date helper class', () => {
    it('Output is string', () => {
        expect(DateHelper.dateToString(new Date())).to.be.string;
    })

    it('check any date', () => {
        let checkdate: Date = new Date(1970, 3, 13, 3, 13, 15);
        expect(DateHelper.dateToString(checkdate)).equals('19700413 03:13:15');
    })
})