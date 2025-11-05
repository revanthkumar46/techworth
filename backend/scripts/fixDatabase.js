const mysql = require('mysql2/promise');
require('dotenv').config();

async function fixDatabase() {
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

    console.log('Connected to database. Fixing issues...\n');

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
          console.log(`✓ Added ${columnName} column to ${tableName}`);
          return true;
        } else {
          console.log(`✓ ${columnName} column already exists in ${tableName}`);
          return false;
        }
      } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
          console.log(`✓ ${columnName} column already exists in ${tableName}`);
          return false;
        } else {
          console.error(`Error checking ${columnName} in ${tableName}:`, err.message);
          return false;
        }
      }
    }

    // Add status column to contact_messages if it doesn't exist
    await addColumnIfNotExists(
      'contact_messages',
      'status',
      "ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new'"
    );

    // Add missing columns to newsletter_subscribers table
    console.log('\n📋 Checking newsletter_subscribers table columns...');
    await addColumnIfNotExists('newsletter_subscribers', 'is_active', 'BOOLEAN DEFAULT TRUE');
    await addColumnIfNotExists('newsletter_subscribers', 'unsubscribed_at', 'TIMESTAMP NULL');

    // Add missing columns to job_applications table
    console.log('\n📋 Checking job_applications table columns...');
    await addColumnIfNotExists('job_applications', 'cover_letter_path', 'VARCHAR(500)');
    await addColumnIfNotExists('job_applications', 'cover_letter_text', 'TEXT');
    await addColumnIfNotExists('job_applications', 'experience_text', 'TEXT');
    await addColumnIfNotExists('job_applications', 'skills', 'TEXT');
    await addColumnIfNotExists('job_applications', 'technologies', 'TEXT');
    await addColumnIfNotExists('job_applications', 'admin_notes', 'TEXT');
    
    // Ensure status column exists with correct enum values
    try {
      const [statusColumns] = await connection.query(`
        SHOW COLUMNS FROM job_applications LIKE 'status'
      `);
      if (statusColumns.length > 0) {
        // Check if status column has the correct enum values
        const statusEnum = statusColumns[0].Type;
        if (!statusEnum.includes('hired')) {
          console.log('⚠️  Updating status column enum values...');
          await connection.query(`
            ALTER TABLE job_applications 
            MODIFY COLUMN status ENUM('pending', 'reviewed', 'shortlisted', 'rejected', 'hired') DEFAULT 'pending'
          `);
          console.log('✓ Updated status column enum values');
        } else {
          console.log('✓ status column enum values are correct');
        }
      } else {
        await addColumnIfNotExists(
          'job_applications',
          'status',
          "ENUM('pending', 'reviewed', 'shortlisted', 'rejected', 'hired') DEFAULT 'pending'"
        );
      }
    } catch (err) {
      console.error('Error checking status column:', err.message);
    }

    // Run schema to ensure all tables exist
    const fs = require('fs');
    const path = require('path');
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

    // Execute CREATE TABLE IF NOT EXISTS statements
    const createTableStatements = schemaSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.startsWith('CREATE TABLE IF NOT EXISTS'));

    for (const statement of createTableStatements) {
      try {
        await connection.query(statement + ';');
        const tableName = statement.match(/CREATE TABLE IF NOT EXISTS (\w+)/)[1];
        console.log(`✓ Verified table: ${tableName}`);
      } catch (err) {
        console.log(`  Table already exists or error: ${err.message}`);
      }
    }

    console.log('\n✅ Database fixes complete!');

  } catch (error) {
    console.error('Database fix error:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

fixDatabase();

