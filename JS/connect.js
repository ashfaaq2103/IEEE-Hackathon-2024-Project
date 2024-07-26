// This file will be used for the node js server. Express will be used to set data from the different tables. 
const sql = require('mssql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// SQL Server connection configuration
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

// Connect to SQL Server
sql.connect(config).then(pool => {
    if (pool.connected) {
        console.log('Connected to SQL Server');
    }

    // Define route to get data
    app.get('/api/data', async (req, res) => {
        try {
            const result = await pool.request().query('SELECT * FROM test_table');
            res.json(result.recordset);
        } catch (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
        }
    });

    // Define route to insert data
    app.post('/api/SendData', (req, res) => {
        const { email, password } = req.body;
        try {
            const query = 'INSERT INTO user_info (Email, Password) VALUES (@Email, @Password)';
            pool.request()
                .input('Email', sql.VarChar, email)
                .input('Password', sql.VarChar, password)
                .query(query);
            res.status(200).send('Data inserted successfully');
        } catch (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
        }
    });

    // Start the server
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch(err => {
    console.error('Error connecting to SQL Server:', err);
});

