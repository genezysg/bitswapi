const logger = require('./logger')
var restify = require('restify');
var config = require('config');
var mongoose = require('mongoose')
var planetResource = require('./resources/planets')

mongoose.connect(`mongodb://localhost/${config.db}`);


const server = restify.createServer({
    name:'dsfbit',
    version:'1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());


server.get('/planets/',planetResource.list);
server.get('/planets/:id',planetResource.get);
server.post('/planets/',planetResource.post);
server.post('/planets/:id',planetResource.update);
server.del('/planets/:id',planetResource.delete);




server.listen(config.get('port'), function() {
    logger.info(`server: server listening on ${config.get('port')}`)
});

module.exports=server;
