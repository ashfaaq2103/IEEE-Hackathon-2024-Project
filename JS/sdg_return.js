// Define the getdata function
async function getdata() {
    fetch('http://localhost:3000/api/sdgTrend', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Output the data
        // console.log('Data fetched from /api/sdgTrend:', data);

        // You can also store the data in variables if needed
        let sdgData = data;
        setData(data)
    })
    .catch(error => {
        console.error('Error fetching data:', error);

    });
}

function setData(data)
{
    for(let i = 1; i < 18; i++)
    {
        let element = "Goal" + i

        let goal = document.getElementById(element) 

        console.log(goal); 
    }
}

// Call the loadEvents function to fetch and display the data
window.onload = getdata();