const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function runSchema() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT || 3306),
      multipleStatements: true
    });

    console.log('Connected to database. Running schema...');

    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

    // Split by semicolons and execute each statement
    const statements = schemaSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await connection.query(statement + ';');
          console.log(`✓ Executed: ${statement.substring(0, 50)}...`);
        } catch (err) {
          // Ignore "table already exists" errors
          if (err.code !== 'ER_TABLE_EXISTS_ERROR' && err.code !== 'ER_DUP_ENTRY') {
            console.error(`Error executing statement: ${err.message}`);
            console.error(`Statement: ${statement.substring(0, 100)}...`);
          }
        }
      }
    }

    console.log('\n✓ Schema execution complete!');

  } catch (error) {
    console.error('Schema execution error:', error.message);
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Database access denied. Please check your .env file credentials.');
    }
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

runSchema();

