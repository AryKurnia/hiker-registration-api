const HikerController = require('../../../adapters/controllers/HikerController');
const validateApiKey = require('../../../adapters/middleware/apiKeyMiddleware');

const hikerRoutes = [
  {
    method: 'POST',
    path: '/hikers',
    handler: HikerController.create,
    options: {
      pre: [{ method: validateApiKey }],
    },
  },
  {
    method: 'GET',
    path: '/hikers',
    handler: HikerController.getAll,
    options: {
      pre: [{ method: validateApiKey }],
    },
  },
  {
    method: 'GET',
    path: '/hikers/{id}',
    handler: HikerController.getById,
    options: {
      pre: [{ method: validateApiKey }],
    },
  },
  {
    method: 'PUT',
    path: '/hikers/{id}',
    handler: HikerController.update,
    options: {
      pre: [{ method: validateApiKey }],
    },
  },
  {
    method: 'DELETE',
    path: '/hikers/{id}',
    handler: HikerController.delete,
    options: {
      pre: [{ method: validateApiKey }],
    },
  },
];

module.exports = hikerRoutes;
