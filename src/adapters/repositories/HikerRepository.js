const IHikerRepository = require('../../domain/interfaces/IHikerRepository');
const ConflictError = require('../../domain/exceptions/ConflictError');
const NotFoundError = require('../../domain/exceptions/NotFoundError');
// const ValidationError = require('../../domain/exceptions/ValidationError');

class HikerRepository extends IHikerRepository {
  constructor(database) {
    super();
    this.database = database;
    this.tableName = 'tbl_pendaki'; // Ganti dengan nama tabel yang sesuai
  }

  async create(hiker) {
    // console.log(hiker);
    const query = `INSERT INTO ${this.tableName} (nama_lengkap, nik, jenis_kelamin, alamat, no_hp, email, tanggal_lahir) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [hiker.name, hiker.nik, hiker.jenisKelamin,
      hiker.alamat, hiker.noHP, hiker.email, hiker.tglLahir];

    try {
      const result = await this.database.query(query, values);
      Object.assign(hiker, { id: result[0].insertId });

      return hiker;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        // Tangkap error unik MySQL dan lemparkan sebagai ConflictError
        throw new ConflictError(`Email '${hiker.email}' sudah terdaftar`);
      }
      throw error; // Lemparkan error lain ke lapisan atas
    }
  }

  async findAll() {
    const query = `SELECT * FROM ${this.tableName}`;

    try {
      const [rows] = await this.database.query(query);

      if (rows.length === 0) {
        throw new NotFoundError('Tidak ada pendaki yang ditemukan');
      }

      return rows;
    } catch (error) {
      if (error.code === 'ER_NO_SUCH_TABLE') {
        throw new NotFoundError(`Table ${this.tableName} tidak ditemukan`);
      }

      throw error;
    }
  }

  async findById(id) {
    const [rows] = await this.database.query(`SELECT * FROM ${this.tableName} WHERE id_pendaki = ?`, [id]);
    return rows[0] || null;
  }

  async update(id, hiker) {
    const query = `
      UPDATE ${this.tableName}
      SET nama_lengkap = ?, nik = ?, jenis_kelamin = ?, alamat = ?, no_hp = ?, email = ?, tanggal_lahir = ?
      WHERE id_pendaki = ?
    `;
    const values = [hiker.name, hiker.nik, hiker.jenisKelamin, hiker.alamat,
      hiker.noHP, hiker.email, hiker.tglLahir, id];

    try {
      const [result] = await this.database.query(query, values);

      if (result.affectedRows === 0) {
        throw new NotFoundError(`Pendaki dengan id ${id} tidak ditemukan`);
      }

      if (result.changedRows === 0) {
        throw new NotFoundError(`Pendaki dengan id ${id} tidak ada yang berubah`);
      }

      Object.assign(hiker, { id: parseInt(id, 10) });

      return hiker;
    } catch (error) {
      if (error.code === 'ER_NO_SUCH_TABLE') {
        throw new NotFoundError(`Table ${this.tableName} tidak ditemukan`);
      }

      throw error;
    }
  }

  async delete(id) {
    const deletedHiker = await this.findById(id);

    const query = `DELETE FROM ${this.tableName} WHERE id_pendaki = ?`;
    await this.database.query(query, [id]);

    return deletedHiker;
  }
}

module.exports = HikerRepository;
