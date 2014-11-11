"use strict"

module.exports = function(context) {
  function signal() {
    return signal.add.apply(signal, arguments)
  }
  signal.beforeFns = []
  signal.afterFns = []
  signal.onceFns = []
  signal.after = function after(fn) {
    signal.afterFns.push(fn)
    return this
  }
  signal.before =
  signal.add = function add(fn) {
    signal.beforeFns.push(fn)
    return this
  }
  signal.once = function once(fn) {
    signal.beforeFns.push(fn)
    signal.onceFns.push(fn)
    return this
  }
  signal.remove = function remove(fn) {
    if (!fn) {
      signal.beforeFns.length = 0
      signal.afterFns.length = 0
      signal.onceFns.length = 0
      return this
    }
    signal.beforeFns.splice(signal.beforeFns.indexOf(fn), 1)
    signal.afterFns.splice(signal.afterFns.indexOf(fn), 1)
    signal.onceFns.splice(signal.onceFns.indexOf(fn), 1)
    return this
  }
  signal.fire = function fire() {
    for (var i = 0; i < signal.beforeFns.length; i++) {
      var fn = signal.beforeFns[i]
      fn.apply(context || this, arguments)
      if (signal.onceFns.indexOf(fn) !== -1) signal.remove(fn)
    }
    for (var i = 0; i < signal.afterFns.length; i++) {
      var fn = signal.afterFns[i]
      fn.apply(context || this, arguments)
      if (signal.onceFns.indexOf(fn) !== -1) signal.remove(fn)
    }
    return this
  }
  return signal
}
