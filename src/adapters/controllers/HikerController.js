const CreateHiker = require('../../use_cases/hiker/CreateHiker');
const GetAllHikers = require('../../use_cases/hiker/GetAllHikers');
const GetHikerById = require('../../use_cases/hiker/GetHikerById');
const UpdateHiker = require('../../use_cases/hiker/UpdateHiker');
const DeleteHiker = require('../../use_cases/hiker/DeleteHiker');

const HikerRepository = require('../repositories/HikerRepository');
const ResponseFormatter = require('../presenters/ResponseFormatter');
const NotFoundError = require('../../domain/exceptions/NotFoundError');
const database = require('../../frameworks_and_drivers/database/mysql');

const hikerRepository = new HikerRepository(database);

const createHiker = new CreateHiker(hikerRepository);
const getAllHikers = new GetAllHikers(hikerRepository);
const getHikerById = new GetHikerById(hikerRepository);
const updateHiker = new UpdateHiker(hikerRepository);
const deleteHiker = new DeleteHiker(hikerRepository);

const hikerController = {
  async create(request, h) {
    try {
      const dataHiker = request.payload; // Ambil data dari body request

      const result = ResponseFormatter.formatHikerResponse(await createHiker.executr(dataHiker));
      // const result = await createHiker.executr(dataHiker);
      return h.response(ResponseFormatter.success(result, 'Data pendaki berhasil ditambahkan')).code(201);
    } catch (error) {
      return h.response(ResponseFormatter.error(error.message)).code(500);
    }
  },

  async getAll(request, h) {
    try {
      const hikers = ResponseFormatter.formatHikersResponse(await getAllHikers.executr());

      return h.response(ResponseFormatter.success(hikers, 'Data pendaki berhasil ditemukan')).code(200);
    } catch (error) {
      // Periksa tipe error
      if (error instanceof NotFoundError) {
        return h.response(ResponseFormatter.error(error.message, 'NOT_FOUND')).code(404);
      }

      // Tangani error lain
      return h.response(ResponseFormatter.error(error.message)).code(500);
    }
  },

  async getById(request, h) {
    try {
      const { id } = request.params;
      const hiker = ResponseFormatter.formatHikerResponse(await getHikerById.executr(id));
      return h.response(ResponseFormatter.success(hiker, 'Data pendaki berhasil ditemukan')).code(200);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return h.response(ResponseFormatter.error(error.message, 'NOT_FOUND')).code(404);
      }

      return h.response(ResponseFormatter.error(error.message)).code(500);
    }
  },

  async update(request, h) {
    try {
      const { id } = request.params;
      const dataHiker = request.payload;

      const updatedHiker = ResponseFormatter.formatHikerResponse(
        await updateHiker.executr(id, dataHiker),
      );

      return h.response(ResponseFormatter.success(updatedHiker, 'Data pendaki berhasil diperbarui')).code(200);
    } catch (error) {
      // Controller menangani error berdasarkan jenis (abstraksi)
      switch (error.name) {
        case 'ValidationError':
          return h.response(ResponseFormatter.error(error.message, 'VALIDATION_ERROR')).code(400);
        case 'NotFoundError':
          return h.response(ResponseFormatter.error(error.message, 'NOT_FOUND')).code(404);
        default:
          console.error('Unhandled Error:', error); // Logging untuk debugging
          return h.response(ResponseFormatter.error('Terjadi kesalahan pada server')).code(500);
      }
    }
  },

  async delete(request, h) {
    try {
      const { id } = request.params;
      const deletedHiker = ResponseFormatter.formatHikerResponse(await deleteHiker.executr(id));
      return h.response(ResponseFormatter.success(deletedHiker, 'Data pendaki berhasil dihapus')).code(200);
    } catch (error) {
      // Controller menangani error berdasarkan jenis (abstraksi)
      switch (error.name) {
        case 'NotFoundError':
          return h.response(ResponseFormatter.error(error.message, 'NOT_FOUND')).code(404);
        default:
          console.error('Unhandled Error:', error); // Logging untuk debugging
          return h.response(ResponseFormatter.error('Terjadi kesalahan pada server')).code(500);
      }
    }
  },
};

module.exports = hikerController;
