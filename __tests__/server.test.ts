import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
chai.should();
chai.use(chaiHttp);

describe('Testing start local server', () => {
  it('Must return status success if start server correctly', (done) => {
    chai
      .request(`http://localhost:${process.env.PORT}`)
      .get('/api-docs')
      .end((err, res) => {
        if (err) {
          console.log(err);
          done(err);
        }
        res.should.have.status(200);

        done();
      });
  });
});
