# google-panorama-by-id

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Gets a Google Street View by pano ID. Also features some Node support.

```js
var panorama = require('google-panorama-by-id')

var location = [ 51.50700703827454, -0.12791916931155356 ]
panorama(location, function (err, result) {
  if (err) throw err
  
  // pano ID
  console.log(result.id)

  // actual latitude, longitude
  console.log(result.latitude)
  console.log(result.longitude)

  // other details from Google API
  console.log(result.copyright)
})
```

In Node, the request uses an undocumented API entry-point, using [request](https://www.npmjs.com/package/request). It only provides `{ id, latitude, longitude }`. This is mostly useful for unit testing.

## Usage

[![NPM](https://nodei.co/npm/google-panorama-by-id.png)](https://www.npmjs.com/package/google-panorama-by-id)

#### `panorama(opt, cb)`

Gets the panorama data at the given ID, where `opt` can be a pano ID string like `"dXZfBMex9_L7jO2JW3FTdA"`, or an options object with:

- `id` - the pano ID string
- `service` - (browser only) the Google API `StreetViewService` to use, defaults to a new instance

The Node-style callback uses the form `(err, result)`, where `err` will be null if a street view was found. On success, `result` is an object containing:

```js
{
  id: String, // pano ID
  latitude: Number,
  longitude: Number
}
```

In the browser, the `result` object will also contain other details from `StreetViewService`, like `copyright` and `location`. 

## node

The [node.js](./node.js) entry point uses [request](https://www.npmjs.com/package/request) to request the JSON. However, it also works in the browser, using [jsonp](https://www.npmjs.com/package/jsonp). This means you can require it for quick unit testing in Node/browser, without bringing in the entire Google Client library. 

```js
var panorama = require('google-panorama-by-id/node')

panorama(id, callback)
```

However, this is not recommended for production, since it uses an undocumented API entry point and only returns a limited set of data.

## See Also

- [google-panorama-by-location](https://github.com/Jam3/google-panorama-by-location)
- [google-panorama-equirectangular](https://github.com/mattdesl/google-panorama-equirectangular)

## License

MIT, see [LICENSE.md](http://github.com/Jam3/google-panorama-by-id/blob/master/LICENSE.md) for details.
