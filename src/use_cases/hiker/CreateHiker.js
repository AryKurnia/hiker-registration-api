const Hiker = require('../../domain/entities/Hiker');
const ValidationError = require('../../domain/exceptions/ValidationError');
const HikerValidator = require('../../domain/validators/HikerValidator');

class CreateHiker {
  constructor(hikerRepository) {
    this.hikerRepository = hikerRepository;
  }

  async executr(dataHiker) {
    const {
      name, alamat, noHP, email, tglLahir,
    } = dataHiker;

    const errors = HikerValidator.validate(dataHiker);
    if (errors.length > 0) {
      throw new ValidationError(errors.join(', '));
    }

    const hiker = new Hiker(name, alamat, noHP, email, tglLahir);

    return this.hikerRepository.create(hiker);
  }
}

module.exports = CreateHiker;
