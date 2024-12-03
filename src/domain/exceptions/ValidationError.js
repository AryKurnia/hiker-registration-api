class ValidationError extends Error {
  constructor(message) {
    super(message); // Meneruskan pesan error ke parent class (Error)
    this.name = 'ValidationError'; // Memberikan nama khusus untuk error ini
    this.statusCode = 400; // Menentukan status HTTP untuk error (Bad Request)
  }
}

module.exports = ValidationError;
