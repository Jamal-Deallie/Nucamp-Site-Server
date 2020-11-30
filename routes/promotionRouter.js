const express = require('express');
const promotionRouter = express.Router();

promotionRouter.route('/')
.get((req, res, next) => {
  promotions.find()
  .then(promotions => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(promotions);
  })
  .catch(err => next(err));
})
.post((req, res, next) => {
  promotions.create(req.body)
  .then(promotions => {
      console.log('promotions Created ', promotions);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(promotions);
  })
  .catch(err => next(err));
})
.put((req, res) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
  promotions.deleteMany()
  .then(response => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(response);
  })
  .catch(err => next(err));
});

partnerRouter.route('/:promotionsId')
.get((req, res, next) => {
  promotions.findById(req.params.promotionsId)
  .then(promotions => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(promotions);
  })
  .catch(err => next(err));
})
.post((req, res) => {
  res.statusCode = 403;
  res.end(`POST operation not supported on /promotions/${req.params.promotionsId}`);
})
.put((req, res, next) => {
  Partner.findByIdAndUpdate(req.params.promotionsId, {
      $set: req.body
  }, { new: true })
  .then(promotions => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(promotions);
  })
  .catch(err => next(err));
})
.delete((req, res, next) => {
  Partner.findByIdAndDelete(req.params.promotionsId)
  .then(response => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(response);
  })
  .catch(err => next(err));
});


module.exports = promotionRouter;