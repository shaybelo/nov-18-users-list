const logger = require('morgan');
const bodyParser = require('body-parser');
const users = require('./users/users.routes');
const posts = require('./posts/posts.routes');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect(
	'mongodb://localhost:27017/nov-18-mongoose',
	{ useNewUrlParser: true }
);

const express = require('express');

const app = express();

app.use(cors({
	origin: 'http://localhost:3000',
}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(users.route);
app.use(posts.route);

app.listen(8080);
