/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/findmovieendpoints              ->  index
 * POST    /api/findmovieendpoints              ->  create
 * GET     /api/findmovieendpoints/:id          ->  show
 * PUT     /api/findmovieendpoints/:id          ->  update
 * DELETE  /api/findmovieendpoints/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Findmovieendpoint from './findmovieendpoint.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    console.log('Entity ', entity);
    var updated = _.merge(entity, updates);
    console.log(JSON.stringify(updated));
    updated.markModified('Timings');
    updated.markModified('Cities');
    updated.markModified('Theatres');
    updated.markModified('Dates');
    return updated.save()
      .then(updated => {
        console.log('updated ', updated)
        return updated;
      }).catch(function(e) {
        console.log('Error on update ', e);
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Findmovieendpoints
export function index(req, res) {
  return Findmovieendpoint.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Findmovieendpoint from the DB
export function show(req, res) {
  return Findmovieendpoint.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Findmovieendpoint in the DB
export function create(req, res) {
  return Findmovieendpoint.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Findmovieendpoint in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Findmovieendpoint.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Findmovieendpoint from the DB
export function destroy(req, res) {
  return Findmovieendpoint.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
