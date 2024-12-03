const Registration = require('../../domain/entities/Registration');
const ValidationError = require('../../domain/exceptions/ValidationError');
const RegistrationValidator = require('../../domain/validators/RegistrationValidator');

class CreateRegistration {
  constructor(registrationRepository) {
    this.registrationRepository = registrationRepository;
  }

  async executr(registrationData) {
    const { hikerId, hikingDate, status } = registrationData;

    const errors = RegistrationValidator.validate(registrationData);
    if (errors.length > 0) {
      throw new ValidationError(errors.join(', '));
    }

    const registration = new Registration(hikerId, hikingDate, status);
    const registrationCreatedId = await this.registrationRepository.create(registration);

    Object.assign(registration, { registId: registrationCreatedId });

    return registration;
  }
}

module.exports = CreateRegistration;
