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
    try {
        // Make sure to await this connection to be established
        await sql.connect(config);
        console.log('hi');
        console.log('Connected to SQL Server');

        // Example query
        const result = await sql.query`select * from your_table`;
        console.log(result);

    } catch (err) {
        console.error('Error connecting to SQL Server:', err);
    } finally {
        // Close the connection pool
        await sql.close();
    }
}

connectToDatabase();