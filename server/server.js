const logger = require('morgan');
const bodyParser = require('body-parser');
const users = require('./users/users.routes');
const posts = require('./posts/posts.routes');
const cors = require('cors');
const mongoose = require('mongoose');

const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/nov-18-mongoose';

mongoose.connect(
	DB_URI,
	{ useNewUrlParser: true }
);

const express = require('express');

const app = express();

const port = process.env.PORT || 8080;

app.use(cors({
	origin: 'http://localhost:3000',
}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(users.route);
app.use(posts.route);
app.use(express.static('build'));

app.listen(port);
