const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.path}`);
  next();
});

app.get('/product/:id', (req, res) => {
  console.log('GET on /product/:id')
  axios.get(`http://localhost:3002/product/${req.params.id}`)
    .then((response) => res.status(200).send(response.data))
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get('/LEGACY/product/:id/find-store', (req, res) => {
  console.log('GET on /LEGACY/product/:id/find-store')
  axios.get(`http://localhost:3002/LEGACY/product/${req.params.id}/find-store/?q=${req.query.q}`)
    .then((response) => res.status(200).send(response.data))
    .catch((error) => res.status(500).send(error));
});

app.get('/api/images/:id', (req, res) => {
  console.log('GET on /api/images/:id')
  axios.get(`http://54.176.112.170:3001/api/images/${req.params.id}`)
    .then((response) => res.status(200).send(response.data))
    .catch((error) => res.status(500).send(error));
});

app.get('/api/products/:product_id/reviews', (req, res) => {
  console.log('GET on /api/products/:product_id/reviews')
  axios.get(`http://52.9.106.137:8080/api/products/${req.params.product_id}/reviews`)
    .then((response) => res.status(200).send(response.data))
    .catch((error) => res.status(500).send(error));
});

app.get('/api/products/:product_id/reviews/:review_id', (req, res) => {
  axios.get(`http://52.9.106.137:8080/api/products/${req.params.product_id}/reviews/${req.params.review_id}`)
    .then((response) => res.status(200).send(response.data))
    .catch((error) => res.status(500).send(error));
});

app.listen(PORT, () => console.log(`Server listening on port ${3000}`));
