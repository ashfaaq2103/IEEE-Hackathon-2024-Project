const sql = require('mssql');
const axios = require('axios');
const cheerio = require('cheerio');

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

// Define the function to handle database operations
async function updateDatabase() {
    try {
        // Connect to the database
        let pool = await sql.connect(config);

        // Clear the table
        await pool.request().query('DELETE FROM sdg_trend');

        // Extract SDG data
        const url = "https://dashboards.sdgindex.org/profiles/mauritius";

        // Fetch and parse the HTML content
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Find all div elements with the relevant class containing SDG data
        const sdgElements = $('div.MuiButtonBase-root');

        // Prepare a bulk insert query
        let query = 'INSERT INTO sdg_trend (sdg, rating, trend) VALUES ';
        let values = [];

        // Extract and prepare the SDG data for insertion
        sdgElements.each((index, element) => {
            const sdg = $(element).attr('sdg');
            const rating = $(element).attr('rating');
            let trend = $(element).attr('trend');

            // Convert trend symbols to descriptive strings
            if (trend === '↑') trend = 'upArrow';
            else if (trend === '→') trend = 'rightArrow';
            else if (trend === '➚') trend = 'upRightArrow';
            else if (trend === '•') trend = 'none';
            else if (trend === '↓') trend = 'downArrow';

            // Check for valid data before adding to query
            if (sdg && rating && trend) {
                values.push(`('${sdg}', '${rating}', '${trend}')`);
            }
        });

        // Add the values to the query
        query += values.join(', ');

        // Execute the bulk insert query
        await pool.request().query(query);

        console.log("Data has been inserted into the sdg_trend table");

    } catch (err) {
        console.error("An error occurred: ", err);
    } finally {
        // Close the database connection
        await sql.close();
    }
}

// Set the interval to run the updateDatabase function every 15 minutes (900000 milliseconds)
setInterval(updateDatabase, 15 * 60 * 1000);

// Run the function immediately on startup
updateDatabase();

