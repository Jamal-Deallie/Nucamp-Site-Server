const express = require('express');
const partnerRouter = express.Router();

partnerRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the partner to you');
})
.post((req, res) => {
    res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /partner');
})
.delete((req, res) => {
    res.end('Deleting all partner');
})
.get('/:partnerId', (req, res) => {
    res.end(`Will send details of the partner: ${req.params.partnerId} to you`);
  })
  
  .post('/:partnerId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotion/${req.params.partnerId}`);
  })
  
  .put('/:partnerId', (req, res) => {
    res.write(`Updating the partner: ${req.params.partnerId}\n`);
    res.end(`Will update the partner ${req.body.name}
        with description: ${req.body.description}`);
  })
  
  .delete('/:partnerId', (req, res) => {
    res.end(`Deleting partner ${req.params.partnerId}`);
  });
  

module.exports = partnerRouter;