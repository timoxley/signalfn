'use strict'

module.exports = function (...args) {
  const signal = new Signal(...args)
  const add = function add (...fns) {
    return signal.add(...fns)
  }

  Object.setPrototypeOf(add, signal)
  return add
}

module.exports.Signal = Signal

class Signal {
  constructor (...fns) {
    this.beforeFns = new Set()
    this.duringFns = new Set()
    this.afterFns = new Set()
    this.add(...fns)
  }

  after (...fns) {
    fns.forEach(fn => this.afterFns.add(fn))
    return this
  }

  add (...fns) {
    fns.forEach(fn => this.duringFns.add(fn))
    return this
  }

  before (...fns) {
    fns.forEach(fn => this.beforeFns.add(fn))
    return this
  }

  once (...fns) {
    this.add(...fns.map(fn => {
      const onceFn = (...args) => {
        this.remove(onceFn)
        return fn(...args)
      }
      return onceFn
    }))

    return this
  }

  remove (...fns) {
    if (!fns.length) {
      this.beforeFns.clear()
      this.duringFns.clear()
      this.afterFns.clear()
      return this
    }

    fns.forEach(fn => {
      this.beforeFns.delete(fn)
      this.duringFns.delete(fn)
      this.afterFns.delete(fn)
    })

    return this
  }

  fire (...args) {
    for (let fn of this.beforeFns) {
      fn(...args)
    }

    for (let fn of this.duringFns) {
      fn(...args)
    }

    for (let fn of this.afterFns) {
      fn(...args)
    }

    return this
  }
}
