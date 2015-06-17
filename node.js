var request = require('./lib/request')

module.exports = function panoramaById (opt, cb) {
  opt = opt || {}
  if (typeof opt === 'string') {
    opt = { id: opt }
  }
  var id = opt.id
  if (!id) {
    throw new TypeError('must provide pano ID')
  }

  var url = 'http://maps.google.com/cbk?output=json&cb_client=apiv3&v=4&dm=1&pm=1&ph=1&hl=en&panoid=' + id

  // in the browser we need to use jsonp to get the data
  request(url, function (err, body) {
    if (err) return cb(err)
    if (!body || !body.Data) {
      return cb(new Error('could not find street view by id: ' + id))
    }
    body.id = body.Location.panoId
    body.latitude = parseFloat(String(body.Location.lat))
    body.longitude = parseFloat(String(body.Location.lng))
    cb(null, body)
  })
}
