# Yammer Fitbit Integration
_Posts your Fitbit badges to Yammer._

## General plan

* Use the [Oauth](https://github.com/ciaranj/node-oauth) module to connect to Yammer and Fitbit (yammer-client.js, fitbit-client.js).
* Create files yammer-keys.js and fitbit-keys.js to insert your consumer keys and urls provided by each site. (See yammer-keys.template.js and fitbit-keys.template.js)
* Create yammer-fitbit.js to use the clients and do the reading from Fitbit and the posting to Yammer.

## References

* Take a look at [Nyam](https://github.com/csanz/node-nyam) for example on how to use Oauth and connect to use Yammer.
* Take a look at [Fitbit-js](https://github.com/smurthas/fitbit-js) for an example on how to connect to and use Fitbit api. (Perhaps even use it.)