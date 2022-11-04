const index = require('../routes/index');
const Item = require('../models/item');

const mongoose = require('mongoose');

const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/', index);

require('dotenv').config();

const { connectDb, closeDb } = require('../config/mongoDb');
// const { connectDb, closeDb } = require('../config/mongoTesting');

describe('Database operations', () => {
  beforeAll(async () => {
    await connectDb();
  });

  afterAll(async () => {
    await closeDb();
  });

  test('items with both required properties save to database', async () => {
    const testItem = new Item({
      text: 'A valid test item with both required properties',
      completed: false,
    });

    await testItem.save();
    expect(testItem._id).toBeDefined();
  });

  test('items without a required property do not save to database', async () => {
    const testItem = new Item({
      text: 'An invalid test item',
    });

    try {
      await testItem.save();
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    }
  });
});

test('index route works', (done) => {
  request(app).get('/').expect({ name: 'frodo' }).expect(200, done);
});

test('testing route works', (done) => {
  request(app)
    .post('/test')
    .type('form')
    .send({ item: 'hey' })
    .then(() => {
      request(app)
        .get('/test')
        .expect({ array: ['hey'] }, done);
    });
});
