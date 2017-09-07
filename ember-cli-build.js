/* eslint-env node */
const
    EmberAddon = require('ember-cli/lib/broccoli/ember-addon'),
    env = EmberAddon.env()

module.exports = function(defaults) {

    let config = {
        'ember-cli-babel': {
            includePolyfill: true
        }
    }

    if (env === 'test') {
        config['ember-cli-babel'].optional = ['es6.spec.symbols'];
    }

    var app = new EmberAddon(defaults, config)

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

    return app.toTree()
}
