class GetAllRegistration {
  constructor(registrationRepository) {
    this.registrationRepository = registrationRepository;
  }

  async executr() {
    const registrations = await this.registrationRepository.getAll();
    // console.log(registrations);
    return registrations;
  }
}

module.exports = GetAllRegistration;
