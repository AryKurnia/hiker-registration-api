const Hiker = require('../../domain/entities/Hiker');
const ValidationError = require('../../domain/exceptions/ValidationError');
const HikerValidator = require('../../domain/validators/HikerValidator');

class UpdateHiker {
  constructor(hikerRepository) {
    this.hikerRepository = hikerRepository;
  }

  async executr(id, dataHiker) {
    const errors = HikerValidator.validate(dataHiker);
    if (errors.length > 0) {
      throw new ValidationError(errors.join(', '));
    }

    const {
      name, nik, jenisKelamin, alamat, noHP, email, tglLahir,
    } = dataHiker;

    const hiker = new Hiker(name, nik, jenisKelamin, alamat, noHP, email, tglLahir);

    return this.hikerRepository.update(id, hiker);
  }
}

module.exports = UpdateHiker;
