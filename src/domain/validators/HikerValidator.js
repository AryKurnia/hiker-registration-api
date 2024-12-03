class HikerValidator {
  static validate(data) {
    const errors = [];

    // Validasi Nama
    if (!data.name || data.name.trim().length < 2) {
      errors.push('Nama harus minimal 2 karakter');
    }
    if (!/^[A-Za-z\s]+$/.test(data.name)) {
      errors.push('Nama hanya boleh berisi huruf dan spasi');
    }

    // Validasi Nomor HP
    if (!data.noHP.startsWith('62')) {
      errors.push('No HP harus dimulai dengan kode negara (62)');
    }
    if (!/^\d+$/.test(data.noHP)) {
      errors.push('No HP hanya boleh mengandung angka');
    }
    if (data.noHP.length < 10 || data.noHP.length > 15) {
      errors.push('No HP harus memiliki panjang antara 10-15 digit');
    }

    // Validasi Email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!data.email) {
      errors.push('Email tidak boleh kosong');
    } else if (!emailRegex.test(data.email)) {
      errors.push('Email tidak valid');
    }

    // Validasi Tanggal Lahir
    if (!data.tglLahir) {
      errors.push('Tanggal lahir tidak boleh kosong');
    } else {
      const sekarang = new Date();
      const tanggalLahir = new Date(data.tglLahir);

      if (Number.isNaN(tanggalLahir.getTime())) {
        errors.push('Tanggal lahir tidak valid, format yang benar adalah YYYY-MM-DD');
      } else {
        const usia = sekarang.getFullYear() - tanggalLahir.getFullYear();
        if (usia < 17 || tanggalLahir > sekarang) {
          errors.push(`Usia pendaki saat ini ${usia} tahun, harus minimal 17 tahun dan tidak boleh tanggal di masa depan`);
        }
      }
    }

    return errors.length > 0 ? errors : true;
  }
}

module.exports = HikerValidator;
