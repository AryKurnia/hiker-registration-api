const IRegistrationRepository = require('../../domain/interfaces/IRegistrationRepository');

class RegistrationRepository extends IRegistrationRepository {
  constructor(database) {
    super();
    this.database = database;
    this.tableName = 'tbl_pendaftaran'; // Ganti dengan nama tabel yang sesuai
  }

  async create(registration) {
    // Insert data pendaftaran
    const queryInsert = `INSERT INTO ${this.tableName} (id_pendaftaran, id_pendaki, tanggal_pendakian, status) VALUES (NULL, ?, ?, ?)`;
    const valuesInsert = [registration.hikerId, registration.hikingDate, registration.status];

    try {
      // Step 1: Lakukan INSERT dan dapatkan registeredId
      const data = await this.database.query(queryInsert, valuesInsert);
      const registeredId = data[0].insertId;

      // Step 2: Lakukan SELECT untuk mendapatkan nama pendaki
      const querySelect = 'SELECT nama_lengkap AS name FROM tbl_pendaki WHERE id_pendaki = ?';
      const dataSelect = await this.database.query(querySelect, [registration.hikerId]);

      const result = {
        registeredId,
        hikerName: dataSelect[0][0].name,
      };

      // Return registeredId dan nama pendaki
      return result;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        // Tangkap error unik MySQL dan lemparkan sebagai ConflictError
        throw new Error('Terdapat duplikat data');
      }
      throw error;
    }
  }

  async getAll() {
    // const query = `SELECT * FROM ${this.tableName}`;
    const query = `
    SELECT 
      pendaftaran.id_pendaftaran,
      pendaki.id_pendaki,
      pendaki.nama_lengkap,
      pendaftaran.tanggal_pendakian,
      pendaftaran.status
    FROM tbl_pendaftaran AS pendaftaran
    JOIN tbl_pendaki AS pendaki
    ON pendaftaran.id_pendaki = pendaki.id_pendaki
    `;
    const [rows] = await this.database.query(query);
    // console.log(rows);
    return rows;
  }
}

module.exports = RegistrationRepository;
