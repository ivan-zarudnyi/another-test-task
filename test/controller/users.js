const {server, expect, chai} = require('../test');
const fs = require('fs');

describe('Users Api', function () {

  describe('/GET users/:userId', () => {
    it('it should accept request', done => {
      chai
        .request(server)
        .get('/api/user/1')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('/GET users/:userId/avatar', () => {
    it('should return and create avatar file', done => {
      chai
        .request(server)
        .get('/api/user/1/avatar')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);

          expect(res.body).to.be.not.null;
          const file = fs.readFileSync('storage/1');
          expect(file).to.be.not.null;

          done();
        });
    });
  });

  describe('/DELETE users/:userId/avatar', () => {
    it('should return and create avatar file', done => {
      chai
        .request(server)
        .delete('/api/user/1/avatar')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);

          expect(res.body).to.be.not.null;
          try {
            var file = fs.readFileSync('storage/1');
          } catch (e) {
            expect(e.code).to.be.equal('ENOENT');
          }
          expect(file).to.be.undefined;

          done();
        });
    });
  });
});
