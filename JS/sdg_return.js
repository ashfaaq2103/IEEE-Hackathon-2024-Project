// Define the getdata function
function getdata() {
    fetch('http://localhost:3000/api/sdgTrend', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Output the data
        console.log('Data fetched from /api/sdgTrend:', data);

        // You can also store the data in variables if needed
        let sdgData = data;
    })
    .catch(error => {
        console.error('Error fetching data:', error);

    });
}

// Call the getdata function to fetch and display the data
getdata();
