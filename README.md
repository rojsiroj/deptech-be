# DepTech Test Backend

Berikut adalah langkah-langkah untuk menjalakan aplikasi ini:

1. Clone Project
2. Masuk ke folder project dan jalankan `cp .env.example .env`, sesuaikan isinya dengan local anda terutama pada bagian `DB_*`
3. Jalankan `npm install`
4. Jalankan `npx sequelize-cli db:create` untuk membuat database dengan nama sesuai pada `DB_NAME` pada `.env`
5. Jalankan `npx sequelize-cli db:migrate` untuk menjalankan migration
6. Jalankan `npx sequelize-cli db:seed:all` untuk melakukan seeder data
7. Jalankan `npx nodemon app.js` untuk memulai server
8. Kunjungi route `/api/docs` untuk mengakses swagger-ui
