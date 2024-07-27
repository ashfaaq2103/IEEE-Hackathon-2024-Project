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
    for(let i = 0; i < 17; i++)
    {
        let element = "Goal" + (i+1) 

        let goal = document.getElementById(element) 
        let dataTrend = data[i].trend; 

        if (dataTrend == "rightArrow")
        {
            goal.innerHTML = '<i class="fa fa-arrow-right" aria-hidden="true" style="position: center; font-size: 4.5rem; left: 60%; color: orange;"></i>';
        }

        if (dataTrend == "upArrow")
        {
            goal.innerHTML = ''; 
            goal.innerHTML = '<i class="fa fa-arrow-up" aria-hidden="true" style="position: center; font-size: 4.5rem; left: 60%; color: rgb(18, 199, 18);"></i>';  
        }

        if (dataTrend == "upRightArrow")
        {
            goal.innerHTML = '<i class="fa fa-arrow-right" aria-hidden="true" style="position: center; font-size: 4.5rem; left: 60%; color: orange;"></i>';
        }

        if (dataTrend == "downArrow")
        {
            goal.innerHTML = '<i class="fa fa-arrow-down" aria-hidden="true" style="position: center; font-size: 4.5rem; left: 60%; color: red;"></i>';  
        }

        if (dataTrend == "none")
        {
            goal.innerHTML = '<i class="fa fa-plus" aria-hidden="true" style="position: center; font-size: 4.5rem; left: 60%; color: grey;"></i>';  
        }

    }
}

// Call the loadEvents function to fetch and display the data
window.onload = getdata();