/* eslint-env node */
'use strict';

var md5 = require('md5');

module.exports = {
  path: function(actualPath, classicStyleDir) {
    var terminator = '/';
    var pathSegementToRemove = /^components\//;

    if (actualPath.includes(classicStyleDir)) {
      terminator = '.';
      pathSegementToRemove = 'styles/' + classicStyleDir + '/';
    } else if (actualPath.startsWith('components/')) {
      terminator = '.';
    }

    if (actualPath.startsWith('styles/')) {
      let [path] = actualPath.split('.');

      return path;
    }

    return actualPath.substr(0, actualPath.lastIndexOf(terminator)).replace(pathSegementToRemove, '');
  },

  class: function(modifiedPath, classicStyleDir, terseClassNames) {
    var seperator = '__';
    var componentPath = this.path(modifiedPath, classicStyleDir);
    var className = seperator + md5(componentPath).slice(-5);
    
    if (modifiedPath.startsWith('styles/')) {
      let [routePath] = modifiedPath
        .replace(/\//g, seperator)
        .replace('styles/', '')
        .split('.');

      className = seperator + routePath + className;
    } else if (!terseClassNames) {
      className = seperator + componentPath.replace(/\//g, seperator) + className;
    }

    return className;
  }
};
