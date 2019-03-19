var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const http = require('http');
const { OpenApiMiddleware } = require('../');

var app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// const ov = OpenAPIRequestValidator();
// var router = express.Router();

app.use(
  new OpenApiMiddleware({
    apiSpecPath: './openapi.yaml',
    validate: true,
    enableObjectCoercion: true, // should be default
    errorTransformer: (a, b) => {
      console.log('---error trans---', a, b);

      return a;
    }
  }).middleware()
);
/* GET home page. */
app.get('/v1/pets', function(req, res, next) {
  console.log('at /v1/pets here');
  res.json({
    test: 'hi'
  });
});

export const server = http.createServer(app);
server.listen(3000);
console.log('Listening on port 3000');
console.log('Try visiting http://localhost:3000/greet?name=Jason');
console.log('-----STARTED[---');

export default app;