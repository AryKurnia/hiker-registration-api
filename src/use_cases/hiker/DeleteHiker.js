// const Hiker = require('../../domain/entities/Hiker');
// const ValidationError = require('../../domain/exceptions/ValidationError');
// const HikerValidator = require('../../domain/validators/HikerValidator');
const NotFoundError = require('../../domain/exceptions/NotFoundError');

class DeleteHiker {
  constructor(hikerRepository) {
    this.hikerRepository = hikerRepository;
  }

  async executr(id) {
    const hiker = await this.hikerRepository.findById(id);
    if (!hiker) {
      throw new NotFoundError(`Pendaki dengan id ${id} tidak ditemukan`);
    }
    return this.hikerRepository.delete(id);
  }
}

module.exports = DeleteHiker;
