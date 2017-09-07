module.exports = {
    name: 'ember-addon-auth',

    normalizeEntityName: function () {},

    afterInstall: function(options) {
        let dependencyNames, packages, pkg

        pkg = this.project.addonPackages[this.name].pkg
        dependencyNames = (pkg['bayzat-addon'] || {}).topLevelDependencies || []

        if (dependencyNames.length === 0) {
            return Promise.resolve()
        }

        packages = dependencyNames.map(function(name) {
            let
                addonPackage = {
                    npmName: name // that's not used by Ember
                },
                target = pkg.devDependencies[name] || pkg.dependencies[name]

            // check for GH dep (that's a very, very rough check :))
            if (target.indexOf('/') !== -1) {
                addonPackage.name = target
            } else {
                addonPackage.name = name
                addonPackage.target = target
            }

            return addonPackage
        })

        let blueprintTask = this.taskFor('generate-from-blueprint')

        return this.addAddonsToProject({
            packages: packages
        }).then(() => {
            // blueprints for top level packages has to be installed manually
            // there is a bug in npm-package-arg which prevents "detection" of default blueprint name
            // names cannot be found in urls like "<user>/<package>#tag"
            return packages
                .filter(function(packageDefinition) {
                    return packageDefinition.target === undefined
                })
                .reduce(function(promise, addonPackage) {
                    return promise.then(function() {
                        return blueprintTask.run({
                            args: [addonPackage.npmName],
                            ignoreMissingMain: true
                        })
                    })
                }, Promise.resolve())
        })
    }
}
