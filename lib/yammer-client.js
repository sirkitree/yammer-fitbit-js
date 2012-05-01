var fs = require('fs')
    , util = require('util')
    , path = require('path')
    , PATH_CONFIG = path.join(__dirname,'/yammer-keys.js')
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
// console.log(config);

/**
 * Setup OAuth
 *
 * @param {Pointer} callback
 * @api public
 */
setup = function(callback){
    oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
        if (error) {
            util.puts('error : ' + error);
        } else {
            util.puts('oauth_token :' + oauth_token);
            util.puts('oauth_token_secret :' + oauth_token_secret);
            util.puts('requestoken results :' + util.inspect(results));
            util.puts("Requesting access token");

            console.log('\nNavigate to: https://www.yammer.com/oauth/authorize?oauth_token=' + oauth_token + '\n');
            return input("Enter authorization code: ", function(oauth_verifier){
                oa.getOAuthAccessToken(oauth_token, oauth_token_secret, oauth_verifier, function(error, oauth_access_token, oauth_access_token_secret, results2) {
                    if (error) {
                        util.puts(util.inspect(error));
                    } else {
                        config.oauth_access_token = oauth_access_token;
                        config.oauth_token_secret = oauth_access_token_secret;
                        config.save();

                        console.log('setup complete');
                    }
                });
            });
        }
    });
}

/**
 * Post an update.
 *
 * @param {String} data
 * @param {Pointer} callback
 * @api public
 */
post_update = function(data, callback){
    var post_url = 'https://www.yammer.com/api/v1/messages.json'
        , access_token = config.oauth_access_token
        , token_secret = config.oauth_token_secret
        , post_data = { body: data };
    oa.post(post_url, access_token, token_secret, post_data, function(error, data) {
        if (error) callback(JSON.parse(error.data));
        if (callback) callback(data);
    });
}

setup();

/**
 * Input Utility
 *
 * @param {String} message
 * @param {Pointer} callback
 * @api private
 */
input = function(message, callback){
    var data = "";
    console.log(message);
    process.stdin.on("data", function (c) {
        c = c + "";
        switch (c) {
            case "\n": case "\r": case "\u0004":
                callback(data);
                stdin.pause();
                break
            case "\u0003":
                process.exit();
                break
            default:
                data += c;
                break
        }
    })
}