'use strict';

var app = require('../..');
import request from 'supertest';

var newFindmovieendpoint;

describe('Findmovieendpoint API:', function() {

  describe('GET /api/findmovieendpoints', function() {
    var findmovieendpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/findmovieendpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          findmovieendpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(findmovieendpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/findmovieendpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/findmovieendpoints')
        .send({
          name: 'New Findmovieendpoint',
          info: 'This is the brand new findmovieendpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newFindmovieendpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created findmovieendpoint', function() {
      expect(newFindmovieendpoint.name).to.equal('New Findmovieendpoint');
      expect(newFindmovieendpoint.info).to.equal('This is the brand new findmovieendpoint!!!');
    });

  });

  describe('GET /api/findmovieendpoints/:id', function() {
    var findmovieendpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/findmovieendpoints/' + newFindmovieendpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          findmovieendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      findmovieendpoint = {};
    });

    it('should respond with the requested findmovieendpoint', function() {
      expect(findmovieendpoint.name).to.equal('New Findmovieendpoint');
      expect(findmovieendpoint.info).to.equal('This is the brand new findmovieendpoint!!!');
    });

  });

  describe('PUT /api/findmovieendpoints/:id', function() {
    var updatedFindmovieendpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/findmovieendpoints/' + newFindmovieendpoint._id)
        .send({
          name: 'Updated Findmovieendpoint',
          info: 'This is the updated findmovieendpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedFindmovieendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFindmovieendpoint = {};
    });

    it('should respond with the updated findmovieendpoint', function() {
      expect(updatedFindmovieendpoint.name).to.equal('Updated Findmovieendpoint');
      expect(updatedFindmovieendpoint.info).to.equal('This is the updated findmovieendpoint!!!');
    });

  });

  describe('DELETE /api/findmovieendpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/findmovieendpoints/' + newFindmovieendpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when findmovieendpoint does not exist', function(done) {
      request(app)
        .delete('/api/findmovieendpoints/' + newFindmovieendpoint._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
