/*globals google*/
module.exports = function panoramaById (opt, cb) {
  opt = opt || {}
  if (typeof opt === 'string') {
    opt = { id: opt }
  }
  var id = opt.id
  if (!id) {
    throw new TypeError('must provide pano ID')
  }

  var service = opt.service
  if (!service) {
    if (typeof google === 'undefined' || !google.maps) {
      throw new Error('tried to use Google API without "google.maps" in global scope\n'
        + '  try using \'google-panorama-by-id/node.js\' instead')
    }
    service = new google.maps.StreetViewService()
  }

  if (typeof service.getPanoramaByLocation !== 'function') {
    throw new TypeError('must provide valid service with getPanoramaByLocation')
  }

  service.getPanoramaById(id, function (result, status) {
    if (/^ok$/i.test(status)) {
      result.id = result.location.pano
      result.latitude = result.location.latLng.lat()
      result.longitude = result.location.latLng.lng()
      cb(null, result)
    } else {
      cb(new Error('could not find street view by id: ' + id))
    }
  })
}
