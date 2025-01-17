const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

require('dotenv').config();

app.use(cookieParser());
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
require('./config/mongoose.config');

const userRouter = require('./routes/user.routes');
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
