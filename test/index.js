"use strict"

var test = require("tape")

var Signal = require('../')

test('add + fire', function(t) {
  var signal = Signal()
  signal(function() {
    t.end()
  })
  signal.fire()
})

test('fire with values', function(t) {
  var signal = Signal()
  var expected1 = {}
  var expected2 = {}

  signal(function(fired1, fired2) {
    t.equal(fired1, expected1)
    t.equal(fired2, expected2)
    t.end()
  })

  signal.fire(expected1, expected2)
})

test('remove', function(t) {
  var signal = Signal()
  var count = 0
  function toRemove() {
    t.equal(++count, 1)
  }
  signal(toRemove)
  signal.fire()
  signal.remove(toRemove)
  signal.fire()
  t.end()
})

test('remove one among many', function(t) {
  t.plan(3)
  var signal = Signal()
  var count = 0
  var count2 = 0
  function toRemove() {
    t.equal(++count, 1)
  }
  signal(toRemove)
  signal(function() {
    t.ok(++count2)
  })
  signal.fire()
  signal.remove(toRemove)
  signal.fire()
})

test('once', function(t) {
  var signal = Signal()
  var count = 0
  signal.once(function toRemove() {
    t.equal(++count, 1)
  })
  signal.fire()
  signal.fire()
  signal.fire()
  t.end()
})
