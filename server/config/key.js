if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod'); // app in the production mode
} else {
  module.exports = require('./dev'); // app in the development mode
}