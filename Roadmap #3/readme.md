# Roadmap Beken - API Tugas

API sederhana berbasis **Express.js** untuk mengelola task/states menggunakan file `data.json` sebagai database.


![Postman]([Screenshot 2026-0703 142743.png](https://github.com/brmenn/Roadmap/blob/main/Roadmap%20%233/Screenshot%202026-07-03%20142743.png?raw=true))

## Cara Menjalankan

```bash
npm install
node index.js
```

Server akan berjalan di `http://localhost:3000`.

## Endpoints

| Method   | Endpoint        | Deskripsi               |
| -------- | --------------- | ----------------------- |
| `GET`    | `/api`          | Cek koneksi API         |
| `GET`    | `/api/read`     | Membaca semua data      |
| `POST`   | `/api/create`   | Menambahkan data baru   |
| `POST`   | `/api/update`   | Memperbarui data        |
| `DELETE` | `/api/clear`    | Menghapus semua data    |

### GET /api

```json
{
  "message": "Hello World!"
}
```

### GET /api/read

Mengembalikan seluruh data dari `data.json`.

```json
{
  "data": { "task1": "selesai", "task2": "proses" }
}
```

### POST /api/create

Menambahkan data baru ke `data.json`.

**Body (JSON):**
```json
{
  "task": "nama_task",
  "state": "status_task"
}
```

**Response:**
```json
{
  "message": "Data created: nama_task = status_task"
}
```

### POST /api/update

Memperbarui data yang sudah ada di `data.json`.

**Body (JSON):**
```json
{
  "task": "nama_task",
  "state": "status_baru"
}
```

**Response:**
```json
{
  "message": "Data updated: nama_task = status_baru"
}
```

### DELETE /api/clear

Menghapus seluruh isi `data.json`.

**Response:**
```json
{
  "message": "Data cleared."
}
```

## Struktur File

```
index.js       # File utama (server Express)
data.json      # Database sederhana (JSON)
README.md
```
