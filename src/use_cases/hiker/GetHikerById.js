const NotFoundError = require('../../domain/exceptions/NotFoundError');

class GetHikerById {
  constructor(hikerRepository) {
    this.hikerRepository = hikerRepository;
  }

  async executr(id) {
    const hiker = await this.hikerRepository.findById(id);
    if (!hiker) {
      throw new NotFoundError(`Pendaki dengan id ${id} tidak ditemukan`);
    }
    return hiker;
  }
}

module.exports = GetHikerById;
