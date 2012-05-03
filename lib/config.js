/**
 * Module dependencies.
 */
var fs = require('fs')
    , noop = function(){}
    , path = require('path');

/**
 * Expose constructor.
 */
module.exports = Config;

/**
 * Initialize a new `Config`.
 *
 * @param {Object} conf
 * @api public
 */
function Config(PATH_CONFIG) {
    var keys;

    // read config
    if (path.existsSync(PATH_CONFIG)) {
        keys = JSON.parse(fs.readFileSync(PATH_CONFIG, "utf8"));
    }

    // assign variables
    this.app_consumer_key = keys.app_consumer_key;
    this.app_consumer_secret = keys.app_consumer_secret;
    this.request_token_url = keys.request_token_url;
    this.access_token_url = keys.access_token_url;

    this.path = PATH_CONFIG;
};

/**
 * Save data.
 *
 * @param {Function} fn
 * @api public
 */
Config.prototype.save = function(PATH_CONFIG, fn){
  var data = JSON.stringify(this);
  fs.writeFileSync(PATH_CONFIG, data);
  return this;
};

/**
 * Load data.
 *
 * @param {Function} fn
 * @api public
 */
Config.prototype.load = function(fn){
  var self = this
    , fn = fn || noop;
  fs.readFile(PATH_CONFIG, 'utf8', function(err, json){
    if (err) return fn(err);
    var data = JSON.parse(json)
      , keys = Object.keys(data)
      , len = keys.length;
    for (var i = 0; i < len; ++i) {
      self[keys[i]] = data[keys[i]];
    }
    fn();
  });
  return this;
};
