const users = require('./users/users.routes');

const express = require('express');

const app = express();

app.use(users.route);

app.listen(8080);
