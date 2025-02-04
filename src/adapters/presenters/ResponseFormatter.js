const { format } = require('date-fns');

class ResponseFormatter {
  static formatDate(date) {
    if (!date) return null; // Pastikan tidak ada error jika tanggal kosong atau null
    try {
      const jsDate = new Date(date); // Konversi ke objek Date
      return format(jsDate, 'yyyy-MM-dd'); // Format menjadi yyyy-MM-dd
    } catch (error) {
      return date; // Jika format gagal, kembalikan nilai asli
    }
  }

  static formatHikerResponse(hiker) {
    // Memformat data pendaki agar lebih bersih dan mudah dibaca
    return {
      id: hiker.id || hiker.id_pendaki,
      name: hiker.name || hiker.nama_lengkap,
      nik: hiker.nik,
      jenisKelamin: hiker.jenisKelamin || hiker.jenis_kelamin,
      alamat: hiker.alamat || hiker.alamat,
      noHP: hiker.noHP || hiker.no_hp,
      email: hiker.email || hiker.email,
      tglLahir: this.formatDate(hiker.tglLahir || hiker.tanggal_lahir),
    };
  }

  static formatRegistrationResponse(registration) {
    // Memformat data pendaftaran agar lebih bersih dan mudah dibaca
    return {
      registId: registration.id || registration.id_pendaftaran || registration.registId,
      hikerId: registration.hikerId || registration.id_pendaki,
      hikerName: registration.hikerName || registration.nama_lengkap,
      hikerNik: registration.hikerNik,
      hikingDate: this.formatDate(registration.hikingDate || registration.tanggal_pendakian),
      status: registration.status || registration.status_pendaftaran,
      note: registration.note,
    };
  }

  // Formater jika dalam array
  static formatHikersResponse(hikers) {
    return hikers.map((hiker) => this.formatHikerResponse(hiker));
  }

  static formatRegistrationsResponse(registrations) {
    return registrations.map((registration) => this.formatRegistrationResponse(registration));
  }

  static success(data, message) {
    return {
      status: 'success',
      data,
      message,
    };
  }

  static error(message, errorCode = null) {
    return {
      status: 'error',
      message,
      ...(errorCode && { errorCode }),
    };
  }
}

module.exports = ResponseFormatter;
