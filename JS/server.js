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
            const result = await pool.request().query('SELECT * FROM user_info');
            res.json(result.recordset);
        } catch (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
        }
    });

    // Define route to insert data
    // Define route to check if email exists
    app.post('/api/checkEmail', async (req, res) => {
        const { email } = req.body;
        try {
            const result = await pool.request()
                .input('Email', sql.VarChar, email)
                .query('SELECT COUNT(*) as count FROM user_info WHERE Email = @Email');
            const exists = result.recordset[0].count > 0;
            res.json({ exists });
        } catch (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
        }
    });

    // Define route to insert data
    app.post('/api/SendData', async (req, res) => {
        const { email, password } = req.body;
        try {
            const checkResult = await pool.request()
                .input('Email', sql.VarChar, email)
                .query('SELECT COUNT(*) as count FROM user_info WHERE Email = @Email');
            if (checkResult.recordset[0].count > 0) {
                res.status(400).send('Email already exists');
                return;
            }
            const query = 'INSERT INTO user_info (Email, Password) VALUES (@Email, @Password)';
            await pool.request()
                .input('Email', sql.VarChar, email)
                .input('Password', sql.VarChar, password)
                .query(query);
            res.status(200).send('Data inserted successfully');
        } catch (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
        }
    });

    // Define route to handle login
    app.post('/api/login', async (req, res) => {
        const { email, password } = req.body;
        try {
            const result = await pool.request()
                .input('Email', sql.VarChar, email)
                .query('SELECT Password FROM user_info WHERE Email = @Email');
            if (result.recordset.length === 0) {
                res.json({ success: false, message: 'Email does not exist' });
            } else {
                const storedPassword = result.recordset[0].Password;
                if (storedPassword === password) {
                    res.json({ success: true });
                } else {
                    res.json({ success: false, message: 'Incorrect password' });
                }
            }
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

