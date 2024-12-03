const IRegistrationRepository = require('../../domain/interfaces/IRegistrationRepository');

class RegistrationRepository extends IRegistrationRepository {
  constructor(database) {
    super();
    this.database = database;
    this.tableName = 'tbl_pendaftaran'; // Ganti dengan nama tabel yang sesuai
  }

  async create(registration) {
    const query = `INSERT INTO ${this.tableName} (id_pendaftaran, id_pendaki, tanggal_pendakian, status) VALUES (NULL, ?, ?, ?)`;
    const values = [registration.hikerId, registration.hikingDate, registration.status];

    try {
      const data = await this.database.query(query, values);
      // console.log(data);
      const registeredId = data[0].insertId;
      // console.log('ID Pendaftaran:', registeredId);
      return registeredId;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        // Tangkap error unik MySQL dan lemparkan sebagai ConflictError
        throw new Error('Terdapat duplikat dat');
      }
      throw error;
    }
  }
}

module.exports = RegistrationRepository;
