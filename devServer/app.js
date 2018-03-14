import express from 'express';

const path = require('path');
const fs = require('fs');

import WebpackMiddlewar from './webpackMiddleware';

const app = express();

WebpackMiddlewar(app);

app.use('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.body = fs.readFileSync(path.resolve(__dirname, '../public/index.html'));
});

export default app;
