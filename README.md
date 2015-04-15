# signalfn

Simple signalling.

Basically an event emitter which only fires a single event. Use multiple emitters for different concerns. This makes events discoverable as part of the object's signature, rather than just random strings you need to find in the documentation.

## Usage

### Create new signals

```js

var Signal = require('signalfn')

var API = {}
API.onsave = new Signal()
API.onload = new Signal()

```

### Fire signals

```js
API.save = function save() {
  // ...
  this.onsave.fire()
}
API.load = function(data) {
  // ...
  this.onload.fire(data)
}
```

### Add handers to signals

```js
API.onsave(function() {
  console.log('triggered save 1')
})

// same as
API.onsave.add(function() {
  console.log('triggered save 2')
})

API.save()
// => triggered save 1
// => triggered save 2
```

### Fire signals with data

```js
API.onload(function(data) {
  console.log('triggered load', data)
})

API.load('some data')
// => triggered load some data
```
### Remove handlers

```js
function toRemove() {
  console.log('to remove')
}

API.onsave.add(toRemove)
API.save()
// => triggered save 1
// => triggered save 2
// => to remove
API.onsave.remove(toRemove)
API.save()
// => triggered save 1
// => triggered save 2
```

### Remove all handlers

```js
API.onsave.remove()
```

### Trigger handler once

```js
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

## License

MIT
