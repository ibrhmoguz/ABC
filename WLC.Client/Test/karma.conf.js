module.exports = function (config) {
    config.set({
        basePath: '',
        port: 9876,
        frameworks: ['jasmine'],
        files: [
            'Test/Unit/*.js'
        ],
        autoWatch: true,
        browsers: ['Chrome'],
        colors: true,
        reporters: ['progress']
    });
};

