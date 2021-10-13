"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQUEST_TYPE = exports.METHOD_API = void 0;
var METHOD_API;
(function (METHOD_API) {
    METHOD_API["GET"] = "GET";
    METHOD_API["HEAD"] = "HEAD";
    METHOD_API["POST"] = "POST";
    METHOD_API["PUT"] = "PUT";
    METHOD_API["PATCH"] = "PATCH";
    METHOD_API["DELETE"] = "DELETE";
    METHOD_API["CONNECT"] = "CONNECT";
    METHOD_API["OPTIONS"] = "OPTIONS";
    METHOD_API["TRACE"] = "TRACE";
})(METHOD_API = exports.METHOD_API || (exports.METHOD_API = {}));
var REQUEST_TYPE;
(function (REQUEST_TYPE) {
    REQUEST_TYPE["JSON"] = "json";
    REQUEST_TYPE["FROM_DATA"] = "formData";
    REQUEST_TYPE["X_WWW_FORM_URLENCODED"] = "xWwwFormUrlencoded";
})(REQUEST_TYPE = exports.REQUEST_TYPE || (exports.REQUEST_TYPE = {}));
//# sourceMappingURL=interface.js.map