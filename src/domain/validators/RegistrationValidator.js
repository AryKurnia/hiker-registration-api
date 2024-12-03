class RegistrationValidator {
  static validate(registration) {
    const errors = [];

    if (!registration.hikerId) {
      errors.push('ID pendaki tidak boleh kosong');
    }

    if (!registration.status) {
      errors.push('Status tidak boleh kosong');
    } else if (registration.status !== 'Pending' && registration.status !== 'Diterima' && registration.status !== 'Ditolak') {
      errors.push("Status hanya boleh 'Pending', 'Diterima' atau 'Ditolak'");
    }

    const hikingDate = new Date(registration.hikingDate);
    if (Number.isNaN(hikingDate.getTime())) {
      errors.push('Tanggal tidak valid, format yang benar adalah YYYY-MM-DD');
    } else {
      const today = new Date();
      if (hikingDate < today) {
        errors.push('Tanggal pendakian tidak boleh sebelum tanggal sekarang');
      }
    }

    return errors.length > 0 ? errors : true;
  }
}

module.exports = RegistrationValidator;
