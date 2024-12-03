const Boom = require('@hapi/boom');

// Middleware untuk memvalidasi API Key
function validateApiKey(request, h) {
  const apiKey = request.headers['x-api-key'];

  // Cek apakah API Key ada
  if (!apiKey) {
    throw Boom.unauthorized('API Key is missing');
  }

  // Cek apakah API Key valid
  if (apiKey !== process.env.API_KEY) {
    throw Boom.unauthorized('Invalid API Key');
  }

  // API Key valid, lanjutkan ke proses selanjutnya
  return h.continue;
}

module.exports = validateApiKey;
