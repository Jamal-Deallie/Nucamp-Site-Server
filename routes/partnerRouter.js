const express = require('express');
const partnerRouter = express.Router();

partnerRouter.route('/')
.get((req, res, next) => {
  Partners.find()
  .then(partners => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(partners);
  })
  .catch(err => next(err));
})
.post((req, res, next) => {
  Partners.create(req.body)
  .then(partners => {
      console.log('Partners Created ', partners);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(partners);
  })
  .catch(err => next(err));
})
.put((req, res) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /partners');
})
.delete((req, res, next) => {
  Partners.deleteMany()
  .then(response => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(response);
  })
  .catch(err => next(err));
});

partnerRouter.route('/:partnersId')
.get((req, res, next) => {
  Partners.findById(req.params.partnersId)
  .then(partners => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(partners);
  })
  .catch(err => next(err));
})
.post((req, res) => {
  res.statusCode = 403;
  res.end(`POST operation not supported on /partners/${req.params.partnersId}`);
})
.put((req, res, next) => {
  Partner.findByIdAndUpdate(req.params.partnersId, {
      $set: req.body
  }, { new: true })
  .then(partners => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(partners);
  })
  .catch(err => next(err));
})
.delete((req, res, next) => {
  Partner.findByIdAndDelete(req.params.partnersId)
  .then(response => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(response);
  })
  .catch(err => next(err));
});

module.exports = partnerRouter;