const CreateRegistration = require('../../use_cases/registration/CreateRegistration');
const GetAllRegistration = require('../../use_cases/registration/GetAllRegistration');

const RegistrationRepository = require('../repositories/RegistrationRepository');
const ResponseFormatter = require('../presenters/ResponseFormatter');
const database = require('../../frameworks_and_drivers/database/mysql');

const registrationRepository = new RegistrationRepository(database);

const createRegistration = new CreateRegistration(registrationRepository);
const getAllRegistration = new GetAllRegistration(registrationRepository);

const registrationController = {
  async create(request, h) {
    try {
      const dataRegistration = request.payload;
      const result = await createRegistration.executr(dataRegistration);
      return h.response(ResponseFormatter.success(ResponseFormatter.formatRegistrationResponse(result), 'Registrasi Pendaki Berhasil')).code(201);
    } catch (error) {
      switch (error.name) {
        case 'ValidationError':
          return h.response(ResponseFormatter.error(error.message, 'VALIDATION_ERROR')).code(error.statusCode);
        default:
          console.error('Unhandled Error:', error); // Logging untuk debugging
          return h.response(ResponseFormatter.error('Terjadi kesalahan pada server')).code(500);
      }
    }
  },

  async getAll(request, h) {
    try {
      const registrations = await getAllRegistration.executr();
      return h.response(ResponseFormatter.success(ResponseFormatter.formatRegistrationsResponse(registrations), 'Data pendaki berhasil ditemukan'))
        .code(200);
    } catch (error) {
      throw new Error('Terjadi kesalahan pada server');
    }
  },
};

module.exports = registrationController;
