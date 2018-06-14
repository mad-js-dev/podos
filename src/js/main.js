require('../sass/common.scss');
require('../sass/framework.scss');
require('../sass/utils.scss');
require('jquery');

function component() {
  var element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());