const express = require('express');
const index = express.Router();
const Item = require('../models/item');

index.get('/', (req, res) => {
  res.json({ name: 'frodo' });
});

index.get('/test', (req, res) => {
  Item.find({}).exec((err, items) => {
    if (err) {
      return next(err);
    }
    res.json({ items });
  });
});

index.post('/test', (req, res) => {
  const item = new Item({
    text: req.body.item,
    completed: false,
  });

  item.save((err) => {
    if (err) {
      return next(err);
    }
    res.send('success');
  });
});

module.exports = index;
