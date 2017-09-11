'use strict'

module.exports = {
    name: 'ember-addon-auth',

    init() {
        this._super.init.apply(this, arguments)
        this.otherAssetPaths = [] // workaround for ember-font-awesome error in inlcuded hook (to avoid usage of another fork)
    },

    isDevelopingAddon() {
        return true
    }
}
