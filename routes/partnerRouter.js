const express = require('express');
const partnerRouter = express.Router();
// We need to import the Partner Model so we can use it throughout our partner router
// and change all of the plural Partners to singular Partner in the routes below
const Partner = require('../models/partners');

partnerRouter
	.route('/')
	.get((req, res, next) => {
		Partner.find()
			.then((partners) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(partners);
			})
			.catch((err) => next(err));
	})
	.post(authenticate.verifyUser, (req, res) => {
		Partner.create(req.body)
			.then((partners) => {
				console.log('Partners Created ', partners);
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(partners);
			})
			.catch((err) => next(err));
	})
	.put(authenticate.verifyUser, (req, res) => {
		res.statusCode = 403;
		res.end('PUT operation not supported on /partners');
	})
	.delete(authenticate.verifyUser, (req, res, next) => {
		Partner.deleteMany()
			.then((response) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(response);
			})
			.catch((err) => next(err));
	});

partnerRouter
	.route('/:partnersId')
	.get((req, res, next) => {
		Partner.findById(req.params.partnersId)
			.then((partners) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(partners);
			})
			.catch((err) => next(err));
	})
	.post(authenticate.verifyUser, (req, res) => {
		res.statusCode = 403;
		res.end(`POST operation not supported on /partners/${req.params.partnersId}`);
	})
	.put(authenticate.verifyUser, (req, res, next) => {
		Partner.findByIdAndUpdate(
			req.params.partnersId,
			{
				$set: req.body,
			},
			{new: true}
		)
			.then((partners) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(partners);
			})
			.catch((err) => next(err));
	})
	.delete(authenticate.verifyUser, (req, res, next) => {
		Partner.findByIdAndDelete(req.params.partnersId)
			.then((response) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(response);
			})
			.catch((err) => next(err));
	});

module.exports = partnerRouter;
