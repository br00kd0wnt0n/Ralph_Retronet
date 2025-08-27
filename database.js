const { Pool } = require('pg');

// Railway automatically provides DATABASE_URL environment variable
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/ralph_cms',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize database table
async function initDatabase() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS cms_config (
                id SERIAL PRIMARY KEY,
                config_data JSONB NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        
        // Create an index for faster queries
        await pool.query(`
            CREATE INDEX IF NOT EXISTS idx_cms_config_updated_at ON cms_config (updated_at DESC);
        `);
        
        console.log('✅ Database initialized successfully');
        return true;
    } catch (error) {
        console.error('❌ Database initialization failed:', error.message);
        return false;
    }
}

// Save configuration to database
async function saveConfig(configData) {
    try {
        // Check if we have any existing config
        const existingResult = await pool.query('SELECT id FROM cms_config LIMIT 1');
        
        if (existingResult.rows.length > 0) {
            // Update existing config
            await pool.query(
                'UPDATE cms_config SET config_data = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
                [JSON.stringify(configData), existingResult.rows[0].id]
            );
            console.log('📝 Config updated in database');
        } else {
            // Insert new config
            await pool.query(
                'INSERT INTO cms_config (config_data) VALUES ($1)',
                [JSON.stringify(configData)]
            );
            console.log('📝 Config inserted into database');
        }
        
        return true;
    } catch (error) {
        console.error('❌ Failed to save config to database:', error.message);
        return false;
    }
}

// Load configuration from database
async function loadConfig() {
    try {
        const result = await pool.query(
            'SELECT config_data, EXTRACT(EPOCH FROM updated_at) * 1000 as last_modified FROM cms_config ORDER BY updated_at DESC LIMIT 1'
        );
        
        if (result.rows.length > 0) {
            console.log('📄 Config loaded from database');
            return {
                config: result.rows[0].config_data,
                lastModified: parseInt(result.rows[0].last_modified)
            };
        } else {
            console.log('📄 No config found in database');
            return null;
        }
    } catch (error) {
        console.error('❌ Failed to load config from database:', error.message);
        return null;
    }
}

// Test database connection
async function testConnection() {
    try {
        await pool.query('SELECT NOW()');
        console.log('✅ Database connection successful');
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        return false;
    }
}

module.exports = {
    initDatabase,
    saveConfig,
    loadConfig,
    testConnection
};