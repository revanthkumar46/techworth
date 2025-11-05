const mysql = require('mysql2/promise');
require('dotenv').config();

async function migrateApplications() {
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
    console.log('📋 Migrating job_applications table...\n');

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

    // Check if job_applications table exists
    try {
      await connection.query('SELECT 1 FROM job_applications LIMIT 1');
      console.log('✓ job_applications table exists\n');
    } catch (err) {
      console.error('✗ job_applications table does not exist. Please run the schema.sql first.');
      process.exit(1);
    }

    // Add missing columns
    console.log('Adding missing columns...\n');
    await addColumnIfNotExists('job_applications', 'cover_letter_path', 'VARCHAR(500)');
    await addColumnIfNotExists('job_applications', 'cover_letter_text', 'TEXT');
    await addColumnIfNotExists('job_applications', 'experience_text', 'TEXT');
    await addColumnIfNotExists('job_applications', 'skills', 'TEXT');
    await addColumnIfNotExists('job_applications', 'technologies', 'TEXT');
    
    // Ensure status column has correct enum values
    try {
      const [statusColumns] = await connection.query(`
        SHOW COLUMNS FROM job_applications LIKE 'status'
      `);
      if (statusColumns.length > 0) {
        const statusEnum = statusColumns[0].Type;
        if (!statusEnum.includes('hired')) {
          console.log('\n  ⚠️  Updating status column enum values...');
          await connection.query(`
            ALTER TABLE job_applications 
            MODIFY COLUMN status ENUM('pending', 'reviewed', 'shortlisted', 'rejected', 'hired') DEFAULT 'pending'
          `);
          console.log('  ✓ Updated status column enum values');
        } else {
          console.log('  ✓ status column enum values are correct');
        }
      } else {
        await addColumnIfNotExists(
          'job_applications',
          'status',
          "ENUM('pending', 'reviewed', 'shortlisted', 'rejected', 'hired') DEFAULT 'pending'"
        );
      }
    } catch (err) {
      console.error('  ✗ Error checking status column:', err.message);
    }

    console.log('\n✅ Migration complete!');
    console.log('\n📝 Summary:');
    console.log('  - All required columns have been added to job_applications table');
    console.log('  - Status enum values have been verified');
    console.log('  - Ready to use application management features\n');

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

migrateApplications();

