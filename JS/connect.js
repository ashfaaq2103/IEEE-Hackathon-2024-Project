const sql = require('mssql');

const config = {
    user: 'rootadmin',
    password: '70Leo"3878',
    server: 'anonymous.database.windows.net',
    database: 'anonymous_v2',
    options: {
        encrypt: true, 
        trustServerCertificate: false 
    }
};

async function connectToDatabase() {
    let pool;
    try {
        // Establish connection
        pool = await sql.connect(config);
        console.log('Connected to SQL Server');

        // Call createTable() after connection is established
        await createTable(pool);
    } catch (err) {
        console.error('Error connecting to SQL Server:', err);
    } finally {
        // Close the connection pool
        if (pool) await pool.close();
        console.log('Connection closed');
    }
}

async function createTable(pool) {
    try {
        const request = pool.request();

        // SQL command to create a new table
        const query = `
            CREATE TABLE test_table (
                Id INT IDENTITY(1,1) PRIMARY KEY,
                Name NVARCHAR(100) NOT NULL,
                Age INT NULL,
                Email NVARCHAR(255) NOT NULL UNIQUE,
                CreatedAt DATETIME DEFAULT GETDATE()
            )
        `;

        // Execute the query
        const result = await request.query(query);
        console.log('Table created successfully:', result);

    } catch (err) {
        console.error('Error creating table:', err);
    }
}

connectToDatabase();
