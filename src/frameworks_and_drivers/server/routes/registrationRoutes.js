const RegistrationController = require('../../../adapters/controllers/RegistrationController');
const validateApiKey = require('../../../adapters/middleware/apiKeyMiddleware');

const registrationRoutes = [
  {
    method: 'POST',
    path: '/registrations',
    handler: RegistrationController.create,
    options: {
      pre: [{ method: validateApiKey }],
    },
  },
  {
    method: 'GET',
    path: '/registrations',
    handler: RegistrationController.getAll,
    options: {
      pre: [{ method: validateApiKey }],
    },
  },
];

module.exports = registrationRoutes;
