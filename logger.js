const winston=require('winston')
const config=require('config')
const File=winston.transports.File
const Console=winston.transports.Console

const transportFile=new File({
                            filename:'server.log',
                            level:config.get('log_level.file')
                            })
const trconsole = new Console({level:config.get('log_level.console')});

module.exports=new winston.Logger({transports:[trconsole,transportFile]});
