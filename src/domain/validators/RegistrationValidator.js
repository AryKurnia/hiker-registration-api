class RegistrationValidator {
  static validate(registration) {
    const errors = [];

    // Validasi ID Pendaki
    if (!registration.hikerId) {
      errors.push('ID pendaki tidak boleh kosong');
    }

    // Validasi Status
    if (!registration.status) {
      errors.push('Status tidak boleh kosong');
    } else if (!['Pending', 'Diterima', 'Ditolak'].includes(registration.status)) {
      errors.push("Status hanya boleh 'Pending', 'Diterima' atau 'Ditolak'");
    }

    // Validasi Format Tanggal
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(registration.hikingDate)) {
      errors.push('Format tanggal harus YYYY-MM-DD');
    } else {
      const hikingDate = new Date(`${registration.hikingDate}T00:00:00Z`); // Pastikan UTC
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0); // Reset ke UTC

      if (Number.isNaN(hikingDate.getTime())) {
        errors.push('Tanggal tidak valid');
      } else if (hikingDate < today) {
        errors.push('Tanggal pendakian tidak boleh sebelum tanggal sekarang');
      }
    }

    return errors.length > 0 ? errors : true;
  }
}

module.exports = RegistrationValidator;
