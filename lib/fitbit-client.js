var fs = require('fs')
    , path = require('path')
    , PATH_CONFIG = path.join(__dirname,'/fitbit-keys.js')
    , ConfigObj = require('./config')
    , config = new ConfigObj(PATH_CONFIG)
    , OAuth = require('oauth').OAuth
    , oa = new OAuth(
        config.request_token_url,
        config.access_token_url,
        config.app_consumer_key,
        config.app_consumer_secret,
        '1.0', null, 'HMAC-SHA1'
    );
console.log(config);