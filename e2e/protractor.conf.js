// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  allScriptsTimeout: 11000,
  specs: [
    // "D:\Revature\Revature Project 3\caliber-2-meta\frontend\e2e",
     './src/**/*.e2e-spec.ts',
     //'./src/app/**/*.spec.ts',
     //'./src/*.spec.ts'
     './src/app/reports/weekly-quality-audit/weekly-quality-audit-tests.spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: false,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};