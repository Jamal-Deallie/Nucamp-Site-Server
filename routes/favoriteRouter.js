const express = require('express');
const favoriteRouter = express.Router();
const authenticate = require('../authenticate');
const Favorite = require('../models/favorite');
const cors = require('./cors');


favoriteRouter.route('/')
.options(cors.corsWithOptions, authenticate.verifyUser, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
  Favorite.find(req.user._id)
  .populate('user')
  .populate('campsites')
			.then((favorite) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(favorite);
			})
			.catch((err) => next(err));
	})
	.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    console.log(`${req.params.campsiteId},${req.params.campsiteId}`);
    Favorite.findOne({user: req.user._id })
			.then((favorite) => {
				if (favorite) {
          favorite.push(req.body);
          favorite
          .save()
          .then((favorite) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
          })
         } else {
          Favorite.create(req.user._id)
          favorite.push(req.user._id)
          favorite
          .save()
          .then((favorite) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite); 
            }) 
          .catch((err) => next(err));
       } 
      
      }) 

	.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
		res.statusCode = 403;
		res.end('PUT operation not supported on /favorite');
	})
	.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
		Favorite.findOneAndDelete()
			.then((response) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(response);
			})
			.catch((err) => next(err));
	});
  favoriteRouter.route('/:campsiteId')
	.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
	.get(cors.cors, authenticate.verifyUser,(req, res, next) => {
		favorite.findById()
			.then((favorite) => {
        res.statusCode = 403;
				res.end('POST operation not supported on /favorite');
				res.json(favorite);
			})
			.catch((err) => next(err));
  })
	.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    Favorite.findOne({user: req.user._id })
    .then((favorite) => {
      if (req.params.campsiteId = null) {
        favorite.push(req.params.campsiteId);
        favorite
        .save()
        .then((favorite) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(favorite);
        })
       } else {
        res.end('That campsite is already in the list of favorites!');
        Favorite.create(req.params.campsiteId)
        favorite.push(req.params.campsiteId)
        favorite
        .save()
        .then((favorite) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(favorite); 
          }) 
        .catch((err) => next(err));
      }
    })
	})
	.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
      res.statusCode = 403;
      res.end('POST operation not supported on /favorite');
	})
	.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Favorite.findOne(req.params.campsiteId);
    (campsiteId, id)=> {
      let i;
      while ((i = campsiteId.indexOf(id)) != -1) {
        campsiteId.splice(i, 1)
    .save()
        .then((campsiteId) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(campsiteId); 
          }) 
          .catch((err) => next(err));
        }}
  });
  
module.exports = favoriteRouter;
