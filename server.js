const logger = require('./logger')
var restify = require('restify');
var config = require('config');
const mongoose=require('./mongoose/connect')
var planetResource = require('./resources/planets')



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
server.put('/planets/:id',planetResource.update);
server.del('/planets/:id',planetResource.delete);




server.listen(config.get('port'), function() {
    const traceid = logger.trace()

    logger.info(traceid,`:server listening on ${config.get('port')}`)
});

module.exports=server;
