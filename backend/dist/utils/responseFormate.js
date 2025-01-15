"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
class response {
    static error(res, error, status_code, data) {
        return res.status(status_code).json({
            error_message: error,
            data: data ? data : null,
            success: false
        });
    }
    static message(res, message, status_code, data) {
        return res.status(status_code).json({
            message: message,
            data: data ? data : null,
            success: true,
        });
    }
}
exports.response = response;
