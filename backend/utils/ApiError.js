class ApiError {
  constructor(code, message, data = []) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.success = false;
  }
}

module.exports = { ApiError };
