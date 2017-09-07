module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    },
    env: {
        browser: true
    },
    extends: [ 'eslint:recommended', 'bayzat' ],
    fix: true
}
