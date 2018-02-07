const winston=require('winston')
const config=require('config')
const File=winston.transports.File
const Console=winston.transports.Console
const uuid=require('uuid/v4')




const transportFile=new File({
                            filename:'server.log',
                            level:config.get('log_level.file'),
                            colorize: true
                            })
const trconsole = new Console({
                                level:config.get('log_level.console'),
                                colorize:true
                            });

logger = new winston.Logger({transports:[trconsole,transportFile]});

logger.trace = () => {
    traceid={tid:uuid()}

    return traceid
}
module.exports=logger
