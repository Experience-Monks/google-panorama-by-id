/*globals google*/
module.exports = function panoramaById (id, opt, cb) {
  if (!id || typeof id !== 'string') {
    throw new TypeError('must provide pano id')
  }

  if (typeof opt === 'function') {
    cb = opt
    opt = {}
  }

  opt = opt || {}

  var service = opt.service
  if (!service) {
    if (typeof google === 'undefined' || !google.maps) {
      throw new Error('tried to use Google API without "google.maps" in global scope\n'
        + '  try using \'google-panorama-by-id/node.js\' instead')
    }
    service = new google.maps.StreetViewService()
  }

  if (typeof service.getPanorama === 'function') {
    service.getPanorama({ pano: id }, handleResponse)
  } else if (typeof service.getPanoramaByLocation === 'function') {
    service.getPanoramaById(id, handleResponse)
  } else {
    throw new TypeError('must provide valid service with getPanorama or getPanoramaByLocation')
  }
  
  function handleResponse (result, status) {
    if (/^ok$/i.test(status)) {
      result.id = result.location.pano
      result.latitude = result.location.latLng.lat()
      result.longitude = result.location.latLng.lng()
      cb(null, result)
    } else {
      cb(new Error('could not find street view by id: ' + id))
    }
  }
}
