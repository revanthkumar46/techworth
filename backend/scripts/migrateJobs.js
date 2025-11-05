const mysql = require('mysql2/promise');
require('dotenv').config();

async function migrateJobs() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT || 3306)
    });

    console.log('Connected to database. Starting migration...');

    // Fetch all jobs from job_openings
    const [jobs] = await connection.query('SELECT * FROM job_openings');

    console.log(`Found ${jobs.length} jobs to migrate.`);

    let migrated = 0;
    let skipped = 0;

    for (const job of jobs) {
      // Check if job already exists in jobs table (by title)
      const [existing] = await connection.query(
        'SELECT id FROM jobs WHERE title = ?',
        [job.title]
      );

      if (existing.length > 0) {
        console.log(`Skipping: "${job.title}" (already exists)`);
        skipped++;
        continue;
      }

      // Map job_openings fields to jobs table
      const requirements = Array.isArray(job.requirements) 
        ? job.requirements.join('\n• ') 
        : (job.requirements || '');
      
      const jobType = job.job_type?.toLowerCase() || 'full_time';
      const mappedJobType = ['full_time', 'part_time', 'contract', 'internship'].includes(jobType)
        ? jobType
        : 'full_time';

      await connection.query(
        `INSERT INTO jobs (
          title, description, requirements, location, job_type, 
          category, status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          job.title,
          job.description || '',
          requirements ? `• ${requirements}` : '',
          job.location || '',
          mappedJobType,
          job.category || '',
          'active', // Set all migrated jobs as active
          job.created_at || new Date()
        ]
      );

      console.log(`Migrated: "${job.title}"`);
      migrated++;
    }

    console.log(`\nMigration complete!`);
    console.log(`Migrated: ${migrated}`);
    console.log(`Skipped: ${skipped}`);

  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

migrateJobs();

