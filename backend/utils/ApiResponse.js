class ApiResponse {
  constructor(code, message, data) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.success = true;
  }
}

module.exports = { ApiResponse };
