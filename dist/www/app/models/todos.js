"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    namespace: "picshow",
    state: {
        "nowcolor": 0, //当前颜色
        "nowtype": 0, //当前类型
        "nowidx": 0, //当前图片的序列号
        "colors": [], //颜色数组
        "types": [],
        "data": {}
    },
    reducers: {
        init_sync: function init_sync(state, _ref) {
            var data = _ref.data;

            //该类型车的颜色的数组
            var colorarr = Object.keys(data.colors);
            return {};
        }
    },
    effects: {}
};
//# sourceMappingURL=picshow.js.map