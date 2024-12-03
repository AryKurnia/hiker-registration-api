const NotFoundError = require('../../domain/exceptions/NotFoundError');

class GetAllHikers {
  constructor(hikerRepository) {
    this.hikerRepository = hikerRepository;
  }

  async executr() {
    const hikers = await this.hikerRepository.findAll();
    if (hikers.length === 0) {
      throw new NotFoundError('Tidak ada data pendaki yang ditemukan');
    }

    return hikers;
  }
}

module.exports = GetAllHikers;
