'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var findmovieendpointCtrlStub = {
  index: 'findmovieendpointCtrl.index',
  show: 'findmovieendpointCtrl.show',
  create: 'findmovieendpointCtrl.create',
  update: 'findmovieendpointCtrl.update',
  destroy: 'findmovieendpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var findmovieendpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './findmovieendpoint.controller': findmovieendpointCtrlStub
});

describe('Findmovieendpoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(findmovieendpointIndex).to.equal(routerStub);
  });

  describe('GET /api/findmovieendpoints', function() {

    it('should route to findmovieendpoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'findmovieendpointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/findmovieendpoints/:id', function() {

    it('should route to findmovieendpoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'findmovieendpointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/findmovieendpoints', function() {

    it('should route to findmovieendpoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'findmovieendpointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/findmovieendpoints/:id', function() {

    it('should route to findmovieendpoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'findmovieendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/findmovieendpoints/:id', function() {

    it('should route to findmovieendpoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'findmovieendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/findmovieendpoints/:id', function() {

    it('should route to findmovieendpoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'findmovieendpointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
