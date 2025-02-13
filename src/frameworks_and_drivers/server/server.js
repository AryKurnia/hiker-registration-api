const Hapi = require('@hapi/hapi');
const hikerRoutes = require('./routes/hikerRoutes');
const registrationRoutes = require('./routes/registrationRoutes');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'], // Mengizinkan semua domain
        headers: ['Accept', 'Content-Type', 'x-api-key'], // Header yang diperbolehkan
      },
    },
  });

  server.route(hikerRoutes);
  server.route(registrationRoutes);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

module.exports = { init };
