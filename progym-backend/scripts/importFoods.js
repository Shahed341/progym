const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mysql = require('mysql2/promise');
require('dotenv').config(); // Load .env for DB credentials

(async () => {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'progymdb'
    });

    const filePath = path.join(__dirname, '../foods.csv');
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        results.push({
          name: row.name,
          calories: parseFloat(row.calories),
          protein: parseFloat(row.protein_per_100g),
          carbs: parseFloat(row.carbs_per_100g),
          fat: parseFloat(row.fat_per_100g)
        });
      })
      .on('end', async () => {
        console.log(`Importing ${results.length} foods...`);

        for (const food of results) {
          await db.execute(
            `INSERT INTO foods (name, calories, protein_per_100g, carbs_per_100g, fat_per_100g)
             VALUES (?, ?, ?, ?, ?)`,
            [food.name, food.calories, food.protein, food.carbs, food.fat]
          );
        }

        console.log('✅ Food data imported successfully.');
        db.end();
      });
  } catch (err) {
    console.error('❌ Failed to import food data:', err.message);
    process.exit(1);
  }
})();
