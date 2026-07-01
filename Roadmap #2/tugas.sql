-- > Slkema databease

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(256) NOT NULL,
  alamat VARCHAR(180) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
);

CREATE TABLE barang (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama_barang VARCHAR(256) NOT NULL,
  pembeli INT NOT NULL,
  tanggal TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pembeli) REFERENCES users(id) ON DELETE CASCADE
);


-- > Indexing
INDEX idx_pemilik_barang ON barang(pembeli);
INDEX idx_tanggal_beli ON barang(tanggal);


-- > Input Data
INSERT INTO users (nama, alamat, email) VALUES
('Miaw', 'Jalan Jalan Ke Ohio', 'miaw@email.com'),
('Cukurukuk', 'Lorem Ipsum', 'cukurukuk@email.com');

INSERT INTO barang (nama_barang, pembeli) VALUES
('Coklat', 1),
('Air Minum', 1),
('Roti', 2);

-- > Querying All Data
SELECT * FROM users;
SELECT * FROM barang;

-- > Querying dengan detail pembeli menggunakan JOIN
SELECT b.id, b.nama_barang, u.nama AS pembeli, b.tanggal
FROM barang b
JOIN users u ON b.pembeli = u.id;

-- > Querying data menggunakan filter
SELECT * FROM barang WHERE pembeli = 1; -- > Search barang yang ada data pembeli spesifik
SELECT * FROM users WHERE email = 'miaw@email.com'; -- > Search email spesifik

-- > Update Data
UPDATE users SET alamat = 'Ntahlah' WHERE id = 1; -- > Ganti data alamat untuk id 1
UPDATE barang SET pembeli = 2 WHERE id = 1; -- > Ganti data pembeli setiap barang yang di beli 1

-- > Hapus Data
DELETE FROM users WHERE id = 2; -- > Hapus data user yang id nya 2
DELETE FROM barang WHERE id = 2; -- > Hapus data barang yang di beli id 2

