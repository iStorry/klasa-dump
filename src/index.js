const { Client } = require('klasa');
const { config, token } = require('./config');

const defaultGuildSchema = require('./schemas/defaultGuildSchema');

class Bow extends Client {

    constructor(...args) {
        super(...args, defaultGuildSchema);
        this.emotes = { 
            "371887639902552065": "372306429274750976", 
            "371887275979702272": "318046813204512770", 
            "371887263124029452": "372290147800186881",
            "380040504513134592": "380041918857609218",
            "294821859961339904": "292964612456841216",
            "294821784912658432": "292964178644172800",
            "294821721200918528": "292964177096605698",
            "294821652825505802": "292964175360163841",
            "294821579031052288": "292964173548355584",
            "294821537427488768": "284689882226360320",
            "372330684741713931": "341443929146785804"
        };
        this.version = config.version;
        this.useragent = `${config.name}/${config.version}`
    }
}

new Bow(config).login(token);
