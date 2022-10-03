import chai, { expect } from "chai";
import chaiHttp from "chai-http";
// supertest - библиотека для тестирования серверов

chai.use(chaiHttp);

// http://localhost:4200/

describe('API get board types', () => {
    it('Returned status is 200', () => {
        chai.request('http://localhost:4200')
            .get('general/board-types')
            .then((res) => {
                expect(res).to.have.status(200);
            })
            .catch((err) => {
                throw err;
            })
    })
})

