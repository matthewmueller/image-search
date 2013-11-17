/**
 * Module dependencies
 */

var nom = require('nom');
var querystring = require('querystring');

/**
 * Export `Search`
 */

exports = module.exports = function(query, options, fn) {
  google(query, options, fn);
};

/**
 * Google search
 *
 * @param {String} query
 * @param {Function} fn
 */

var google = exports.google = function(query, options, fn) {
  if (!fn) fn = options, options = {};
  var url = 'http://images.google.com/search?tbm=isch&q=' + query;

  // get the images
  nom(url, function(err, $) {
    if (err) return fn(err);
    var imgs = $('#res img').parent().map(function() {
      var href = $(this).attr('href');
      var params = querystring.parse(href);
      return params['/imgres?imgurl'];
    });

    fn(null, imgs);
  })
};
