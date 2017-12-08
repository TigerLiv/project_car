"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _dva = require("dva");

require("./CarPicker.less");

var _antd = require("antd");

var _FilterIndicator = require("../components/carpicker/FilterIndicator.js");

var _FilterIndicator2 = _interopRequireDefault(_FilterIndicator);

var _CheckBoxBar = require("../components/carpicker/CheckBoxBar.js");

var _CheckBoxBar2 = _interopRequireDefault(_CheckBoxBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer;

var CarPicker = function (_React$Component) {
    _inherits(CarPicker, _React$Component);

    function CarPicker() {
        _classCallCheck(this, CarPicker);

        var _this = _possibleConstructorReturn(this, (CarPicker.__proto__ || Object.getPrototypeOf(CarPicker)).call(this));

        dispatch();
        return _this;
    }

    _createClass(CarPicker, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "render",
        value: function render() {
            return;
        }
    }]);

    return CarPicker;
}(_react2.default.Component);
//# sourceMappingURL=CarPicker.js.map