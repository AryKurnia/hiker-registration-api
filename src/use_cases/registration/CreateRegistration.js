const Registration = require('../../domain/entities/Registration');
const ValidationError = require('../../domain/exceptions/ValidationError');
const RegistrationValidator = require('../../domain/validators/RegistrationValidator');

class CreateRegistration {
  constructor(registrationRepository) {
    this.registrationRepository = registrationRepository;
  }

  async executr(registrationData) {
    const {
      hikerId, hikingDate, status, note,
    } = registrationData;

    const errors = RegistrationValidator.validate(registrationData);
    if (errors.length > 0) {
      throw new ValidationError(errors.join(', '));
    }

    const registration = new Registration(hikerId, hikingDate, status, note);
    const registrationCreatedId = await this.registrationRepository.create(registration);

    Object.assign(registration, {
      registId: registrationCreatedId.registeredId,
      hikerName: registrationCreatedId.hikerName,
      hikerNik: registrationCreatedId.hikerNik,
    });

    return registration;
  }
}

module.exports = CreateRegistration;
