CREATE DATABASE IF NOT EXISTS gunung_registrasi;
USE gunung_registrasi;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS `tbl_pendaftaran`;
DROP TABLE IF EXISTS `tbl_pendaki`;

-- Create table gunung_registrasi.tbl_pendaki
CREATE TABLE `tbl_pendaki` (
  `id_pendaki` int NOT NULL AUTO_INCREMENT,
  `nama_lengkap` varchar(255) NOT NULL,
  `alamat` text NOT NULL,
  `no_hp` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  PRIMARY KEY (`id_pendaki`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create table gunung_registrasi.tbl_pendaftaran
CREATE TABLE `tbl_pendaftaran` (
  `id_pendaftaran` int NOT NULL AUTO_INCREMENT,
  `id_pendaki` int NOT NULL,
  `tanggal_pendakian` date NOT NULL,
  `status` enum('Pending','Diterima','Ditolak') NOT NULL DEFAULT 'Pending',
  PRIMARY KEY (`id_pendaftaran`),
  KEY `id_pendaki` (`id_pendaki`),
  CONSTRAINT `tbl_pendaftaran_ibfk_1` FOREIGN KEY (`id_pendaki`) REFERENCES `tbl_pendaki` (`id_pendaki`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
