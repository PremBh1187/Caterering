const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const caterersRouter = require('./routes/caterers');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/caterers', caterersRouter);

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});