module.exports = function (config) {
    config.set({
        basePath: '../',
        port: 9876,
        frameworks: ['jasmine'],
        files: [
            //Library scripts
            'Test/Lib/angular.js',  //Ensure Angular is loaded first,
            'Test/Lib/*.js',
            'Scripts/**/*.js',

            //App and test scripts (order matters!)
            'Test/Helpers/*.js',
            'app/wc.directives/directives/wcOverlay.js',
            'app/wc.directives/directives/menuHighlighter.js',
            'app/customersApp/app.js', 
            'app/customersApp/**/*.js',
            'Test/Unit/*.js'
        ],
        autoWatch: true,
        browsers: ['Chrome'],
        reporters: ['progress']
    });
};

