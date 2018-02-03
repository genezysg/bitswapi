var restify = require('restify');
var config = require('config');

const server = restify.createServer({
    name:'dsfbit',
    version:'1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());


function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next()
}

server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(config.get('port'), function() {
  console.log('%s listening at %s', server.name, server.url);
});
