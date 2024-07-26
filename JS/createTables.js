// Only for creation of tables and inserting data in tables 

const sql = require('mssql');

const config = {
    user: 'rootadmin',
    password: '70Leo"3878',
    server: 'anonymous.database.windows.net',
    database: 'anonymous',
    options: {
        encrypt: true, // Use encryption
        trustServerCertificate: false // Change to true if you're connecting to a local dev server
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
            CREATE TABLE user_info (
            id INT PRIMARY KEY,
            Email VARCHAR(255) NOT NULL UNIQUE,
            Password VARCHAR(255) NOT NULL
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