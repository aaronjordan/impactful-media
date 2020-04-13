const express = require('express');
const sendMail = require('./mail');
const app = express();
const path = require('path');

const PORT = 8001;

app.use('/img', express.static('img'));
app.use('/styles', express.static('styles'));
app.use('/scripts', express.static('scripts'));
app.use('/svg', express.static('svg'));

// Data parse
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

app.post('/email', (req, res) => {
  const { name, email, body } = req.body;

  sendMail(name, email, body, (err, data) => {
    if(err) {
      return res.status(500).json({message: 'Internal Error', ok: false});
    }
    return res.json({message: 'Form email was sent.', ok: true});
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});