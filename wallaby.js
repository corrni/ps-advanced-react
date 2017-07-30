module.exports = function(wallaby) {
  return {
    files: [
      'lib/**/*.js',
      'lib/**/*.json',

      '!**/__tests__/*.js',
      '!**/*.(test|spec).js'
    ],

    tests: [
      '**/__tests__/*.js',
      '**/*.(spec|test).js'
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    setup: function() {
      require('babel-polyfill');
    },

    // '**/*.js': wallaby.compilers.babel({
    //   babel: require('babel-core'),
    //   presets: ['env', 'stage-0', 'flow', 'react']
    // })
    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    testFramework: 'jest',

    debug: true
  }
};
