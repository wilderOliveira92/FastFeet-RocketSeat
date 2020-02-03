const express = require('express');

const server = express();

server.use(express.json());

server.get('/teste', (req, res) => {
  return res.json({ ok: true });
});

server.listen(3333);
