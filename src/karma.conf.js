// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: 
      ['jasmine',
      '@angular-devkit/build-angular',
      'jquery-3.3.1'
    ],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      'karma-jquery'
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly','text-summary'],
      fixWebpackSourcePaths: true, 
      combineBrowserReports: true,
    
      skipFilesWithNoCoverage: true,
      'report-config': {
        html: {
          subdir: 'html'
        }
      },
      thresholds: {
        emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
        // thresholds for all files
        global: {
          statements: 100,
          lines: 100,
          branches: 100,
          functions: 100
        },
        // thresholds per file
        each: {
          statements: 100,
          lines: 100,
          branches: 100,
          functions: 100,
          overrides: {
            'baz/component/**/*.js': {
              statements: 98
            }
          }
        }
      },
 
      verbose: true, // output config used by istanbul for debugging
 
      // `instrumentation` is used to configure Istanbul API package.
      instrumentation: {
        // To include `node_modules` code in the report.
        'default-excludes': false
      }
    },
    reporters: ['progress', 'kjhtml','coverage-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
  

  });
};