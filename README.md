# signalfn

Simple signalling.

Makes events discoverable as part of the object's signature, rather
than some random strings you need to find in the documentation.

```js

var Signal = require('signalfn')

var API = {}
API.onsave = new Signal()
API.onload = new Signal()

API.save = function save() {
  // ...
  this.onsave.fire()
}
API.load = function(data) {
  // ...
  this.onload.fire(data)
}


API.onsave(function() {
  console.log('triggered save 1')
})

// same as
API.onsave.add(function() {
  console.log('triggered save 2')
})

API.onload(function(data) {
  console.log('triggered load', data)
})


API.save()
// => triggered save 1
// => triggered save 2

API.load('some data')
// => triggered load some data

function toRemove() {
  console.log('to remove')
}

API.onsave.add(toRemove)
API.onsave.remove(toRemove)
API.save()
// => triggered save 1
// => triggered save 2

API.onsave.once(function() {
  console.log('trigger me once')
})

API.save()
// => triggered save 1
// => triggered save 2
// => trigger me once

API.save()
// => triggered save 1
// => triggered save 2
```
