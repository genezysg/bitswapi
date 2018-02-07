const winston=require('winston')
const config=require('config')
const File=winston.transports.File
const Console=winston.transports.Console
const uuid=require('uuid/v4')




const transportFile=new File({
                            filename:config.get('log_file'),
                            level:config.get('log_level.file'),
                            colorize: true
                            })
const trconsole = new Console({
                                level:config.get('log_level.console'),
                                colorize:true
                            });

logger = new winston.Logger({transports:[trconsole,transportFile]});

logger.trace = () => {
    trace={tid:uuid()}

    return trace
}
module.exports=logger
