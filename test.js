var panorama = require('./node')
var test = require('tape')

test('should get panorama', function (t) {
  t.plan(3)
  panorama('dXZfBMex9_L7jO2JW3FTdA', function (err, result) {
    if (err) return t.fail(err)
    t.deepEqual(result.id, 'dXZfBMex9_L7jO2JW3FTdA')
    t.deepEqual(result.latitude, 51.507067)
    t.deepEqual(result.longitude, -0.128016)
  })

  if (typeof window !== 'undefined' && window.close) {
    setTimeout(function () {
      window.close()
    }, 500)
  }
})
