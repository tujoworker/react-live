(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('prismjs/components/prism-core'), require('prismjs/components/prism-clike'), require('prismjs/components/prism-javascript'), require('prismjs/components/prism-markup'), require('prismjs/components/prism-jsx'), require('unescape'), require('dom-iterator'), require('react'), require('buble'), require('core-js/fn/object/assign'), require('create-react-context'), require('prop-types')) :
	typeof define === 'function' && define.amd ? define(['exports', 'prismjs/components/prism-core', 'prismjs/components/prism-clike', 'prismjs/components/prism-javascript', 'prismjs/components/prism-markup', 'prismjs/components/prism-jsx', 'unescape', 'dom-iterator', 'react', 'buble', 'core-js/fn/object/assign', 'create-react-context', 'prop-types'], factory) :
	(factory((global.ReactLive = {}),global.prismCore,null,null,null,null,global.unescape,global.iterator,global.React,global.Buble,global.assign,global.createContext,global.propTypes));
}(this, (function (exports,prismCore,prismClike,prismJavascript,prismMarkup,prismJsx,unescape,iterator,React,buble,assign,createContext,propTypes) { 'use strict';

unescape = unescape && unescape.hasOwnProperty('default') ? unescape['default'] : unescape;
iterator = iterator && iterator.hasOwnProperty('default') ? iterator['default'] : iterator;
var React__default = 'default' in React ? React['default'] : React;
assign = assign && assign.hasOwnProperty('default') ? assign['default'] : assign;
createContext = createContext && createContext.hasOwnProperty('default') ? createContext['default'] : createContext;
propTypes = propTypes && propTypes.hasOwnProperty('default') ? propTypes['default'] : propTypes;

var cn = function cn() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.filter(Boolean).join(' ');
};

var prism = function prism(code) {
  var language = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'jsx';
  return prismCore.highlight(code, prismCore.languages[language]);
};

var indentRe = /^((\t|  )+)/mg;
var tabRe = /\t/g;

var normalizeCode = function normalizeCode(code) {
  return code.replace(indentRe, function (_, indentation) {
    return indentation.replace(tabRe, '  ');
  });
};

var normalizeHtml = function normalizeHtml(html) {
  return html.replace('\n', '<br>');
};

var htmlToPlain = function htmlToPlain(html) {
  return unescape(html.replace(/<br>/gm, '\n').replace(/<\/?[^>]*>/gm, ''));
};

function position(el, pos) {
  var selection = window.getSelection();

  if (1 == arguments.length) {
    if (!selection.rangeCount) return;
    var indexes = {};
    var range = selection.getRangeAt(0);
    var clone = range.cloneRange();
    clone.selectNodeContents(el);
    clone.setEnd(range.endContainer, range.endOffset);
    indexes.end = clone.toString().length;
    clone.setStart(range.startContainer, range.startOffset);
    indexes.start = indexes.end - clone.toString().length;
    indexes.atStart = clone.startOffset === 0;
    indexes.commonAncestorContainer = clone.commonAncestorContainer;
    indexes.endContainer = clone.endContainer;
    indexes.startContainer = clone.startContainer;
    return indexes;
  }

  var setSelection = pos.end && pos.end !== pos.start;
  var length = 0;
  var range = document.createRange();
  var it = iterator(el).select(Node.TEXT_NODE).revisit(false);
  var next;
  var startindex;
  var start = pos.start > el.textContent.length ? el.textContent.length : pos.start;
  var end = pos.end > el.textContent.length ? el.textContent.length : pos.end;
  var atStart = pos.atStart;

  while (next = it.next()) {
    var olen = length;
    length += next.textContent.length;

    // Set start point of selection
    var atLength = atStart ? length > start : length >= start;
    if (!startindex && atLength) {
      startindex = true;
      range.setStart(next, start - olen);
      if (!setSelection) {
        range.collapse(true);
        makeSelection(el, range);
        break;
      }
    }

    // Set end point of selection
    if (setSelection && length >= end) {
      range.setEnd(next, end - olen);
      makeSelection(el, range);
      break;
    }
  }
}

function makeSelection(el, range) {
  var selection = window.getSelection();
  el.focus();
  selection.removeAllRanges();
  selection.addRange(range);
}

var getLine = function getLine(plain, cursorPos) {
  var startSlice = plain.slice(0, cursorPos);
  var lastNewline = startSlice.lastIndexOf('\n') + 1;
  var lineSlice = startSlice.slice(lastNewline);
  return lineSlice;
};

var indentRe$1 = /^\s+/;

var getIndent = function getIndent(plain, cursorPos) {
  var line = getLine(plain, cursorPos);
  var matches = line.match(indentRe$1);
  if (matches === null) {
    return '';
  }

  return matches[0] || '';
};

var deindentSpacesRe = /^(\t|  )*  $/;

var getDeindentLevel = function getDeindentLevel(plain, cursorPos) {
  var line = getLine(plain, cursorPos);
  if (!deindentSpacesRe.test(line)) {
    return 0; // Doesn't match regex, so normal behaviour can apply
  }

  // The line contains only whitespace indentation
  // thus two characters must be deleted
  return 2;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Editor = function (_Component) {
  inherits(Editor, _Component);

  function Editor() {
    var _temp, _this, _ret;

    classCallCheck(this, Editor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.undoStack = [], _this.undoOffset = 0, _this.undoTimestamp = 0, _this.compositing = false, _this.state = {
      html: ''
    }, _this.onRef = function (node) {
      _this.ref = node;
    }, _this.getPlain = function () {
      if (_this._innerHTML === _this.ref.innerHTML) {
        return _this._plain;
      }

      var plain = htmlToPlain(normalizeHtml(_this.ref.innerHTML));

      _this._plain = plain;
      _this._innerHTML = _this.ref.innerHTML;

      return _this._plain;
    }, _this.recordChange = function (plain, selection) {
      if (plain === _this.undoStack[_this.undoStack.length - 1]) {
        return;
      }

      if (_this.undoOffset > 0) {
        _this.undoStack = _this.undoStack.slice(0, -_this.undoOffset);
        _this.undoOffset = 0;
      }

      var timestamp = Date.now();
      var record = { plain: plain, selection: selection

        // Overwrite last record if threshold is not crossed
      };if (timestamp - _this.undoTimestamp < 3000) {
        _this.undoStack[_this.undoStack.length - 1] = record;
      } else {
        _this.undoStack.push(record);

        if (_this.undoStack.length > 50) {
          _this.undoStack.shift();
        }
      }

      _this.undoTimestamp = timestamp;
    }, _this.updateContent = function (plain) {
      if (_this.compositing) {
        return;
      }
      _this.setState({ html: prism(plain, _this.props.language) });

      if (_this.props.onChange) {
        _this.props.onChange(plain);
      }
    }, _this.restoreStackState = function (offset) {
      var _this$undoStack = _this.undoStack[_this.undoStack.length - 1 - offset],
          plain = _this$undoStack.plain,
          selection = _this$undoStack.selection;


      _this.selection = selection;
      _this.undoOffset = offset;
      _this.updateContent(plain);
    }, _this.undo = function () {
      var offset = _this.undoOffset + 1;
      if (offset >= _this.undoStack.length) {
        return;
      }

      _this.restoreStackState(offset);
    }, _this.redo = function () {
      var offset = _this.undoOffset - 1;
      if (offset < 0) {
        return;
      }

      _this.restoreStackState(offset);
    }, _this.onKeyDown = function (evt) {
      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(evt);
      }

      if (evt.keyCode === 9 && !_this.props.ignoreTabKey) {
        // Tab Key
        document.execCommand('insertHTML', false, '  ');
        evt.preventDefault();
      } else if (evt.keyCode === 8) {
        // Backspace Key
        var _selectionRange = position(_this.ref),
            cursorPos = _selectionRange.start,
            cursorEndPos = _selectionRange.end;

        if (cursorPos !== cursorEndPos) {
          return; // Bail on selections
        }

        var deindent = getDeindentLevel(_this.getPlain(), cursorPos);
        if (deindent <= 0) {
          return; // Bail when deindent level defaults to 0
        }

        // Delete chars `deindent` times
        for (var i = 0; i < deindent; i++) {
          document.execCommand('delete', false);
        }

        evt.preventDefault();
      } else if (evt.keyCode === 13) {
        // Enter Key
        var _selectionRange2 = position(_this.ref),
            _cursorPos = _selectionRange2.start;

        var indentation = getIndent(_this.getPlain(), _cursorPos);
        document.execCommand('insertHTML', false, '\n' + indentation);
        evt.preventDefault();
      } else if (
      // Undo / Redo
      evt.keyCode === 90 && evt.metaKey !== evt.ctrlKey && !evt.altKey) {
        if (evt.shiftKey) {
          _this.redo();
        } else {
          _this.undo();
        }

        evt.preventDefault();
      }
    }, _this.onKeyUp = function (evt) {
      if (_this.props.onKeyUp) {
        _this.props.onKeyUp(evt);
      }
      if (evt.keyCode === 91 || // left cmd
      evt.keyCode === 93 || // right cmd
      evt.ctrlKey || evt.metaKey) {
        return;
      }

      // Enter key
      if (evt.keyCode === 13) {
        _this.undoTimestamp = 0;
      }

      _this.selection = position(_this.ref);

      if (evt.keyCode !== 37 && // left
      evt.keyCode !== 38 && // up
      evt.keyCode !== 39 && // right
      evt.keyCode !== 40 // down
      ) {
          var plain = _this.getPlain();

          _this.recordChange(plain, _this.selection);
          _this.updateContent(plain);
        } else {
        _this.undoTimestamp = 0;
      }
    }, _this.onCompositionStart = function (evt) {
      if (_this.props.onCompositionStart) {
        _this.props.onCompositionStart(evt);
      }
      _this.compositing = true;
    }, _this.onCompositionEnd = function (evt) {
      if (_this.props.onCompositionEnd) {
        _this.props.onCompositionEnd(evt);
      }
      _this.compositing = false;
    }, _this.onClick = function (evt) {
      if (_this.props.onClick) {
        _this.props.onClick(evt);
      }
      _this.undoTimestamp = 0; // Reset timestamp
      _this.selection = position(_this.ref);
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  Editor.prototype.componentWillMount = function componentWillMount() {
    var html = prism(normalizeCode(this.props.code), this.props.language);
    this.setState({ html: html });
  };

  Editor.prototype.componentDidMount = function componentDidMount() {
    this.recordChange(this.getPlain());
    this.undoTimestamp = 0; // Reset timestamp
  };

  Editor.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref) {
    var code = _ref.code,
        language = _ref.language;

    if (code !== this.props.code || language !== this.props.language) {
      var html = prism(normalizeCode(code), language);
      this.setState({ html: html });
    }
  };

  Editor.prototype.componentDidUpdate = function componentDidUpdate() {
    var selection = this.selection;

    if (selection) {
      position(this.ref, selection);
    }
  };

  Editor.prototype.render = function render() {
    var _props = this.props,
        contentEditable = _props.contentEditable,
        className = _props.className,
        style = _props.style,
        code = _props.code,
        ignoreTabKey = _props.ignoreTabKey,
        language = _props.language,
        rest = objectWithoutProperties(_props, ['contentEditable', 'className', 'style', 'code', 'ignoreTabKey', 'language']);
    var html = this.state.html;


    return React__default.createElement('pre', _extends({}, rest, {
      ref: this.onRef,
      className: cn('prism-code', className),
      style: style,
      spellCheck: 'false',
      contentEditable: contentEditable,
      onCompositionEnd: contentEditable ? this.onCompositionEnd : undefined,
      onCompositionStart: contentEditable ? this.onCompositionStart : undefined,
      onKeyDown: contentEditable ? this.onKeyDown : undefined,
      onKeyUp: contentEditable ? this.onKeyUp : undefined,
      onClick: contentEditable ? this.onClick : undefined,
      dangerouslySetInnerHTML: { __html: html }
    }));
  };

  return Editor;
}(React.Component);

Editor.defaultProps = {
  contentEditable: true,
  language: 'jsx'
};

var _poly = { assign: assign };

var opts = {
  objectAssign: '_poly.assign',
  transforms: {
    dangerousForOf: true,
    dangerousTaggedTemplateString: true
  }
};

var transform = (function (code) {
  return buble.transform(code, opts).code;
});

var errorBoundary = function errorBoundary(Element, errorCallback) {
  return function (_React$Component) {
    inherits(ErrorBoundary, _React$Component);

    function ErrorBoundary() {
      classCallCheck(this, ErrorBoundary);
      return possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    ErrorBoundary.prototype.componentDidCatch = function componentDidCatch(error) {
      errorCallback(error);
    };

    ErrorBoundary.prototype.render = function render() {
      return typeof Element === 'function' ? React__default.createElement(Element, null) : Element;
    };

    return ErrorBoundary;
  }(React__default.Component);
};

var evalCode = function evalCode(code, scope) {
  var scopeKeys = Object.keys(scope);
  var scopeValues = scopeKeys.map(function (key) {
    return scope[key];
  });
  var res = new (Function.prototype.bind.apply(Function, [null].concat(['_poly', 'React'], scopeKeys, [code])))();
  return res.apply(undefined, [_poly, React__default].concat(scopeValues));
};

var generateElement = function generateElement(_ref, errorCallback) {
  var _ref$code = _ref.code,
      code = _ref$code === undefined ? '' : _ref$code,
      _ref$scope = _ref.scope,
      scope = _ref$scope === undefined ? {} : _ref$scope;

  // NOTE: Remove trailing semicolon to get an actual expression.
  var codeTrimmed = code.trim().replace(/;$/, '');

  // NOTE: Workaround for classes and arrow functions.
  var transformed = transform('(' + codeTrimmed + ')').trim();

  return errorBoundary(evalCode('return ' + transformed, scope), errorCallback);
};

var renderElementAsync = function renderElementAsync(_ref2, resultCallback, errorCallback) {
  var _ref2$code = _ref2.code,
      code = _ref2$code === undefined ? '' : _ref2$code,
      _ref2$scope = _ref2.scope,
      scope = _ref2$scope === undefined ? {} : _ref2$scope;

  var render = function render(element) {
    resultCallback(errorBoundary(element, errorCallback));
  };

  if (!/render\s*\(/.test(code)) {
    return errorCallback(new SyntaxError('No-Inline evaluations must call `render`.'));
  }

  evalCode(transform(code), _extends({}, scope, { render: render }));
};

var css = "\n.prism-code {\n  display: block;\n  white-space: pre;\n\n  background-color: #1D1F21;\n  color: #C5C8C6;\n\n  padding: 0.5rem;\n  margin: 0;\n\n  box-sizing: border-box;\n  vertical-align: baseline;\n  outline: none;\n  text-shadow: none;\n  -webkit-hyphens: none;\n  -ms-hyphens: none;\n  hyphens: none;\n  word-wrap: normal;\n  word-break: normal;\n  text-align: left;\n  word-spacing: normal;\n  -moz-tab-size: 2;\n  -o-tab-size: 2;\n  tab-size: 2;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: hsl(30, 20%, 50%);\n}\n\n.token.punctuation {\n  opacity: .7;\n}\n\n.namespace {\n  opacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol {\n  color: hsl(350, 40%, 70%);\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n  color: hsl(75, 70%, 60%);\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string,\n.token.variable {\n  color: hsl(40, 90%, 60%);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n  color: hsl(350, 40%, 70%);\n}\n\n.token.regex,\n.token.important {\n  color: #e90;\n}\n\n.token.important,\n.token.bold {\n  font-weight: bold;\n}\n.token.italic {\n  font-style: italic;\n}\n\n.token.entity {\n  cursor: help;\n}\n\n.token.deleted {\n  color: red;\n}\n";

var prismStyling = React__default.createElement('style', { dangerouslySetInnerHTML: { __html: css } });

var Style = (function () {
  return prismStyling;
});

var LiveContext = createContext('live');

var LiveProvider = function (_Component) {
  inherits(LiveProvider, _Component);

  function LiveProvider() {
    var _temp, _this, _ret;

    classCallCheck(this, LiveProvider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onChange = function (code) {
      var _this$props = _this.props,
          scope = _this$props.scope,
          transformCode = _this$props.transformCode,
          noInline = _this$props.noInline;

      _this.transpile({ code: code, scope: scope, transformCode: transformCode, noInline: noInline });
    }, _this.onError = function (error) {
      _this.setState({ error: error.toString() });
    }, _this.transpile = function (_ref) {
      var code = _ref.code,
          scope = _ref.scope,
          transformCode = _ref.transformCode,
          _ref$noInline = _ref.noInline,
          noInline = _ref$noInline === undefined ? false : _ref$noInline;

      if (!noInline) {
        code = '<>' + code + '</>';
      }
      // Transpilation arguments
      var input = {
        code: transformCode ? transformCode(code) : code,
        scope: scope
      };
      var errorCallback = function errorCallback(err) {
        return _this.setState({ element: undefined, error: err.toString() });
      };
      var renderElement = function renderElement(element) {
        return _this.setState(_extends({}, state, { element: element }));
      };

      // State reset object
      var state = { unsafeWrapperError: undefined, error: undefined };

      try {
        if (noInline) {
          _this.setState(_extends({}, state, { element: null })); // Reset output for async (no inline) evaluation
          renderElementAsync(input, renderElement, errorCallback);
        } else {
          renderElement(generateElement(input, errorCallback));
        }
      } catch (error) {
        _this.setState(_extends({}, state, { error: error.toString() }));
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  LiveProvider.prototype.componentWillMount = function componentWillMount() {
    var _props = this.props,
        code = _props.code,
        scope = _props.scope,
        transformCode = _props.transformCode,
        noInline = _props.noInline;


    this.transpile({ code: code, scope: scope, transformCode: transformCode, noInline: noInline });
  };

  LiveProvider.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref2) {
    var code = _ref2.code,
        scope = _ref2.scope,
        noInline = _ref2.noInline,
        transformCode = _ref2.transformCode;

    if (code !== this.props.code || scope !== this.props.scope || noInline !== this.props.noInline || transformCode !== this.props.transformCode) {
      this.transpile({ code: code, scope: scope, transformCode: transformCode, noInline: noInline });
    }
  };

  LiveProvider.prototype.render = function render() {
    var _props2 = this.props,
        children = _props2.children,
        className = _props2.className,
        code = _props2.code,
        mountStylesheet = _props2.mountStylesheet,
        noInline = _props2.noInline,
        transformCode = _props2.transformCode,
        scope = _props2.scope,
        rest = objectWithoutProperties(_props2, ['children', 'className', 'code', 'mountStylesheet', 'noInline', 'transformCode', 'scope']);


    return React__default.createElement(
      LiveContext.Provider,
      {
        value: _extends({}, this.state, {
          code: this.props.code,
          onError: this.onError,
          onChange: this.onChange
        })
      },
      React__default.createElement(
        'div',
        _extends({ className: cn('react-live', className) }, rest),
        mountStylesheet && React__default.createElement(Style, null),
        children
      )
    );
  };

  return LiveProvider;
}(React.Component);

LiveProvider.defaultProps = {
  code: '',
  mountStylesheet: true,
  noInline: false
};

function LiveEditor(props) {
  return React__default.createElement(
    LiveContext.Consumer,
    null,
    function (_ref) {
      var code = _ref.code,
          _onChange = _ref.onChange;
      return React__default.createElement(Editor, _extends({}, props, {
        code: code,
        onChange: function onChange(code) {
          _onChange(code);

          if (typeof props.onChange === 'function') {
            props.onChange(code);
          }
        }
      }));
    }
  );
}

function LiveError(_ref) {
  var className = _ref.className,
      rest = objectWithoutProperties(_ref, ['className']);

  return React__default.createElement(
    LiveContext.Consumer,
    null,
    function (_ref2) {
      var error = _ref2.error;
      return error ? React__default.createElement(
        'div',
        _extends({}, rest, { className: cn('react-live-error', className) }),
        error
      ) : null;
    }
  );
}

function LivePreview(_ref) {
  var className = _ref.className,
      rest = objectWithoutProperties(_ref, ['className']);

  return React__default.createElement(
    'div',
    _extends({}, rest, { className: cn('react-live-preview', className) }),
    React__default.createElement(
      LiveContext.Consumer,
      null,
      function (_ref2) {
        var Element = _ref2.element;
        return Element && React__default.createElement(Element, null);
      }
    )
  );
}

function withLive(WrappedComponent) {
  var WithLive = function (_Component) {
    inherits(WithLive, _Component);

    function WithLive() {
      classCallCheck(this, WithLive);
      return possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    WithLive.prototype.render = function render() {
      var _this2 = this;

      return React__default.createElement(
        LiveContext.Consumer,
        null,
        function (live) {
          return React__default.createElement(WrappedComponent, _extends({ live: live }, _this2.props));
        }
      );
    };

    return WithLive;
  }(React.Component);

  return WithLive;
}

exports.Editor = Editor;
exports.LiveProvider = LiveProvider;
exports.LiveEditor = LiveEditor;
exports.LiveError = LiveError;
exports.LivePreview = LivePreview;
exports.withLive = withLive;
exports.generateElement = generateElement;
exports.renderElementAsync = renderElementAsync;

Object.defineProperty(exports, '__esModule', { value: true });

})));
