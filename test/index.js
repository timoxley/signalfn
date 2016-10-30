'use strict'

const test = require('tape')

const Signal = require('../')

test('add + fire', t => {
  const signal = Signal()
  signal(() => t.end())
  signal.fire()
})

test('fire with values', t => {
  const signal = Signal()
  const expected1 = {}
  const expected2 = {}

  signal((fired1, fired2) => {
    t.equal(fired1, expected1)
    t.equal(fired2, expected2)
    t.end()
  })

  signal.fire(expected1, expected2)
})

test('remove', t => {
  const signal = Signal()
  let count = 0
  function toRemove () {
    t.equal(++count, 1)
  }
  signal(toRemove)
  signal.fire()
  signal.remove(toRemove)
  signal.fire()
  t.end()
})

test('remove one among many', t => {
  t.plan(3)
  const signal = Signal()
  let count = 0
  let count2 = 0
  function toRemove () {
    t.equal(++count, 1)
  }
  signal(toRemove)
  signal(() => {
    t.ok(++count2)
  })
  signal.fire()
  signal.remove(toRemove)
  signal.fire()
})

test('once', t => {
  const signal = Signal()
  let count = 0
  signal.once(() => {
    t.equal(++count, 1)
  })
  signal.fire()
  signal.fire()
  signal.fire()
  t.end()
})
