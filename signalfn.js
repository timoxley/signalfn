'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var signal = new (Function.prototype.bind.apply(Signal, [null].concat(args)))();
  var add = function add() {
    return signal.add.apply(signal, arguments);
  };

  Object.setPrototypeOf(add, signal);
  return add;
};

module.exports.Signal = Signal;

var Signal = function () {
  function Signal() {
    _classCallCheck(this, Signal);

    this.beforeFns = new Set();
    this.duringFns = new Set();
    this.afterFns = new Set();
    this.add.apply(this, arguments);
  }

  _createClass(Signal, [{
    key: 'after',
    value: function after() {
      var _this = this;

      for (var _len2 = arguments.length, fns = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        fns[_key2] = arguments[_key2];
      }

      fns.forEach(function (fn) {
        return _this.afterFns.add(fn);
      });
      return this;
    }
  }, {
    key: 'add',
    value: function add() {
      var _this2 = this;

      for (var _len3 = arguments.length, fns = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        fns[_key3] = arguments[_key3];
      }

      fns.forEach(function (fn) {
        return _this2.duringFns.add(fn);
      });
      return this;
    }
  }, {
    key: 'before',
    value: function before() {
      var _this3 = this;

      for (var _len4 = arguments.length, fns = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        fns[_key4] = arguments[_key4];
      }

      fns.forEach(function (fn) {
        return _this3.beforeFns.add(fn);
      });
      return this;
    }
  }, {
    key: 'once',
    value: function once() {
      var _this4 = this;

      for (var _len5 = arguments.length, fns = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        fns[_key5] = arguments[_key5];
      }

      this.add.apply(this, _toConsumableArray(fns.map(function (fn) {
        var onceFn = function onceFn() {
          _this4.remove(onceFn);
          return fn.apply(undefined, arguments);
        };
        return onceFn;
      })));

      return this;
    }
  }, {
    key: 'remove',
    value: function remove() {
      var _this5 = this;

      for (var _len6 = arguments.length, fns = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        fns[_key6] = arguments[_key6];
      }

      if (!fns.length) {
        this.beforeFns.clear();
        this.duringFns.clear();
        this.afterFns.clear();
        return this;
      }

      fns.forEach(function (fn) {
        _this5.beforeFns.delete(fn);
        _this5.duringFns.delete(fn);
        _this5.afterFns.delete(fn);
      });

      return this;
    }
  }, {
    key: 'fire',
    value: function fire() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.beforeFns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var fn = _step.value;

          fn.apply(undefined, arguments);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.duringFns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _fn = _step2.value;

          _fn.apply(undefined, arguments);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.afterFns[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _fn2 = _step3.value;

          _fn2.apply(undefined, arguments);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return this;
    }
  }]);

  return Signal;
}();

