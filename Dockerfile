# Gunakan image Node.js versi terbaru sebagai base image
FROM node:18.18.2-alpine3.18

# Tentukan working directory di dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Instal dependensi
RUN npm install --production

# Salin semua kode sumber ke dalam container
COPY . .

# Ekspose port untuk aplikasi (sesuai yang didefinisikan dalam server.js, misalnya 3000)
EXPOSE 3000

# Perintah untuk menjalankan aplikasi saat container dijalankan
CMD ["node", "index.js"]
