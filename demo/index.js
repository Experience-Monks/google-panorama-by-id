/*globals google*/
var test = require('tape')
var panorama = require('../')

var service = new google.maps.StreetViewService()

test('should get photosphere data with service', function (t) {
  var id = 'FIBH8jtubItyC2AUqPhQFw'
  t.plan(4)
  panorama({
    service: service,
    id: id
  }, function (err, result) {
    if (err) return t.fail(err)
    t.deepEqual(result.id, 'FIBH8jtubItyC2AUqPhQFw')
    t.deepEqual(result.latitude, -3.850392)
    t.deepEqual(result.longitude, -32.44078300000001)
    t.deepEqual(typeof result.copyright, 'string', 'extra data')
  })
})

test('should get street view data with service', function (t) {
  var id = 'dXZfBMex9_L7jO2JW3FTdA'
  t.plan(4)
  panorama({
    service: service,
    id: id
  }, function (err, result) {
    if (err) return t.fail(err)
    t.deepEqual(result.id, 'dXZfBMex9_L7jO2JW3FTdA')
    t.deepEqual(result.latitude, 51.507067)
    t.deepEqual(result.longitude, -0.12801600000000235)
    t.deepEqual(typeof result.copyright, 'string', 'extra data')
  })
})
