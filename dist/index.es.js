import { useRef, useEffect, useState } from 'react';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var useChange = function useChange(callback) {
  var deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var initialLoad = useRef(true);
  useEffect(function () {
    if (!initialLoad.current) {
      callback();
    }

    initialLoad.current = false;
  }, deps);
};
function useMousePosition() {
  var _useState = useState({
    x: 0,
    y: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      mousePosition = _useState2[0],
      setMousePosition = _useState2[1];

  function handleMouseMove(e) {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  }

  useEffect(function () {
    window.addEventListener("mousemove", handleMouseMove);
    return function () {
      return window.removeEventListener("mousemove", handleMouseMove);
    };
  });
  return mousePosition;
}
function useMousePositionRelative() {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var mousePosition = useMousePosition();
  var offset = {
    x: 0,
    y: 0
  };

  if (element) {
    var rect = element.getBoundingClientRect();
    offset = {
      x: rect.left,
      y: rect.top
    };
  } else {
    element = window.document.documentElement;
  }

  return {
    x: (mousePosition.x - offset.x) / scale,
    y: (mousePosition.y - offset.y) / scale
  };
}
function useMouseDrag(element) {
  var contraints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!element) {
    element = window.document.documentElement;
  }

  var mousePosition = useMousePositionRelative(element);
  var ref = useRef(mousePosition);

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      startPosition = _useState4[0],
      setStartPosition = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      dragging = _useState6[0],
      setDragging = _useState6[1];

  var handleMouseDown = function handleMouseDown(e) {
    var valid = contraints.every(function (fn) {
      return fn(mousePosition);
    });

    if (valid) {
      setStartPosition(ref.current);
    }
  };

  function handleMouseUp(e) {
    setDragging(false);
  }

  useEffect(function () {
    ref.current = mousePosition;
  }, [mousePosition]);
  useChange(function () {
    setDragging(true);
  }, [startPosition]);
  useEffect(function () {
    if (element) {
      element.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      return function () {
        element.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [element]);
  return {
    mousePosition: {
      start: _objectSpread2({}, startPosition),
      end: _objectSpread2({}, mousePosition)
    },
    dragging: dragging
  };
}

export { useChange, useMouseDrag, useMousePosition, useMousePositionRelative };
//# sourceMappingURL=index.es.js.map
