const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express();

app.use(bodyParser.json({ type: '*/*' }));
app.use(express.static(path.join(__dirname, '../', 'dist')));

const port = process.env.PORT || 8080;
const server = require('http').createServer(app);

server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port}`);
});

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
