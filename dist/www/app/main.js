"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _dva = require("dva");

var _dva2 = _interopRequireDefault(_dva);

var _picshow = require("./models/picshow.js");

var _picshow2 = _interopRequireDefault(_picshow);

var _carpicker = require("./models/carpicker.js");

var _carpicker2 = _interopRequireDefault(_carpicker);

var _route = require("./route.js");

var _route2 = _interopRequireDefault(_route);

var _reduxLogger = require("redux-logger");

require("antd/dist/antd.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//创建app
var app = (0, _dva2.default)({
    onAction: (0, _reduxLogger.createLogger)()
});
app.model(_picshow2.default);
app.model(_carpicker2.default);
//使用路由
app.router(_route2.default);
//上树
app.start("#root");
//# sourceMappingURL=main.js.map