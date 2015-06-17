var get = require('request')

module.exports = function request (url, cb) {
  return get({ url: url, json: true }, function (err, resp, body) {
    if (err) return cb(err)
    if (!/^2/.test(resp.statusCode)) return cb(new Error('http statusCode: ' + resp.statusCode))
    cb(null, body)
  })
}
