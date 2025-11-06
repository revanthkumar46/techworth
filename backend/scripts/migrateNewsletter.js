const mysql = require('mysql2/promise');
require('dotenv').config();

async function migrateNewsletter() {
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

    console.log('🔌 Connected to database\n');
    console.log('📋 Migrating newsletter_subscribers table...\n');

    // Helper function to add column if it doesn't exist
    async function addColumnIfNotExists(tableName, columnName, columnDefinition) {
      try {
        const [columns] = await connection.query(`
          SHOW COLUMNS FROM ${tableName} LIKE '${columnName}'
        `);
        if (columns.length === 0) {
          await connection.query(`
            ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnDefinition}
          `);
          console.log(`  ✓ Added ${columnName} column`);
          return true;
        } else {
          console.log(`  ✓ ${columnName} column already exists`);
          return false;
        }
      } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
          console.log(`  ✓ ${columnName} column already exists`);
          return false;
        } else {
          console.error(`  ✗ Error adding ${columnName}:`, err.message);
          return false;
        }
      }
    }

    // Check if newsletter_subscribers table exists
    try {
      await connection.query('SELECT 1 FROM newsletter_subscribers LIMIT 1');
      console.log('✓ newsletter_subscribers table exists\n');
    } catch (err) {
      console.error('✗ newsletter_subscribers table does not exist. Please run the schema.sql first.');
      process.exit(1);
    }

    // Add missing columns
    console.log('Adding missing columns...\n');
    await addColumnIfNotExists('newsletter_subscribers', 'is_active', 'BOOLEAN DEFAULT TRUE');
    await addColumnIfNotExists('newsletter_subscribers', 'unsubscribed_at', 'TIMESTAMP NULL');

    console.log('\n✅ Migration complete!');
    console.log('\n📝 Summary:');
    console.log('  - All required columns have been added to newsletter_subscribers table');
    console.log('  - Newsletter subscription feature is now ready\n');

  } catch (error) {
    console.error('\n❌ Migration error:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('   Make sure your database server is running and credentials are correct.');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('   Database access denied. Check your DB_USER and DB_PASSWORD.');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('   Database does not exist. Check your DB_NAME.');
    }
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

migrateNewsletter();


