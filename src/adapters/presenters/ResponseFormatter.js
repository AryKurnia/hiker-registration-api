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
      alamat: hiker.alamat || hiker.alamat,
      noHP: hiker.noHP || hiker.no_hp,
      email: hiker.email || hiker.email,
      tglLahir: this.formatDate(hiker.tglLahir || hiker.tanggal_lahir),
    };
  }

  // Formater jika dalam array
  static formatHikersResponse(hikers) {
    return hikers.map((hiker) => this.formatHikerResponse(hiker));
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