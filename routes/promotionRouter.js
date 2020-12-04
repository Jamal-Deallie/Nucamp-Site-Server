const express = require('express');
const promotionRouter = express.Router();
// We need to import the Promotion Model so we can use it throughout our promotion router
// and change all of the plural promotions to singular Promotion in the routes below
const Promotion = require('../models/Promotions');

promotionRouter
	.route('/')
	.get((req, res, next) => {
		// promotions
		Promotion.find()
			.then((promotions) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(promotions);
			})
			.catch((err) => next(err));
	})
	.post(authenticate.verifyUser, (req, res) => {
		// promotions
		Promotion.create(req.body)
			.then((promotions) => {
				console.log('promotions Created ', promotions);
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(promotions);
			})
			.catch((err) => next(err));
	})
	.put(authenticate.verifyUser, (req, res) => {
		res.statusCode = 403;
		res.end('PUT operation not supported on /promotions');
	})
	.delete(authenticate.verifyUser, (req, res, next) => {
		// promotions
		Promotion.deleteMany()
			.then((response) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(response);
			})
			.catch((err) => next(err));
	});

// partnerRouter.route('/:promotionsId')
promotionRouter
	.route('/:promotionsId')
	.get((req, res, next) => {
		// promotions
		Promotion.findById(req.params.promotionsId)
			.then((promotions) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(promotions);
			})
			.catch((err) => next(err));
	})
	.post(authenticate.verifyUser, (req, res) => {
		res.statusCode = 403;
		res.end(`POST operation not supported on /promotions/${req.params.promotionsId}`);
	})
	.put(authenticate.verifyUser, (req, res, next) => {
		Promotion.findByIdAndUpdate(
			req.params.promotionsId,
			{
				$set: req.body,
			},
			{new: true}
		)
			.then((promotions) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(promotions);
			})
			.catch((err) => next(err));
	})
	.delete(authenticate.verifyUser, (req, res, next) => {
		Promotion.findByIdAndDelete(req.params.promotionsId)
			.then((response) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(response);
			})
			.catch((err) => next(err));
	});

module.exports = promotionRouter;
