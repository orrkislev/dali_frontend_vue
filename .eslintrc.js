module.exports = {
    extends: ['plugin:vue/base'],
    rules: {
        'vue/script-setup-uses-vars': 'error',
    },
    env: {
        'vue/setup-compiler-macros': true
    }
}