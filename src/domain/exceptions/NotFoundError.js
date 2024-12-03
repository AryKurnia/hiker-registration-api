class NotFoundError extends Error {
  constructor(message) {
    super(message); // Meneruskan pesan error ke parent class (Error)
    this.name = 'NotFoundError'; // Memberikan nama khusus untuk error ini
    this.statusCode = 404; // Menentukan status HTTP untuk error (Not Found)
  }
}

module.exports = NotFoundError;
