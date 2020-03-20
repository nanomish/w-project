const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('./models/Contacts');

const app = express();

mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);


app.use(bodyParser.json());

require('./routes/contacts')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}

const PORT = process.env.PORT || 9997;
app.listen(PORT, () => {
  console.log(`contacts app is running on port ${PORT}`)
});