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

        let goal = document.getElementById(element) ; 
        // Create a new paragraph element
        const p = document.createElement('p');
        let dataTrend = data[i].trend; 

        if (dataTrend == "rightArrow")
        {
            goal.innerHTML = '<i class="fa fa-arrow-right" aria-hidden="true" style="position: center; font-size: 4.5rem; left: 60%; color: orange;"></i>';
            p.style.color = 'orange';
            p.style.position = 'absolute';
            p.style.fontSize = '1.1rem';
            p.style.left = '-30%';
            p.style.top = '100%';
            p.style.fontFamily = 'monospace';
            p.innerHTML = 'STAGNATING';
        }

        if (dataTrend == "upArrow")
        {
            goal.innerHTML = '<i class="fa fa-arrow-up" aria-hidden="true" style="position: center; font-size: 4.5rem; left: 60%; color: rgb(18, 199, 18);"></i>';  
            // Set the innerHTML of the paragraph
            // Apply the styles to the paragraph element
            p.style.color = 'rgb(18, 199, 18)';
            p.style.position = 'absolute';
            p.style.fontSize = '1.1rem';
            p.style.left = '-15%';
            p.style.top = '100%';
            p.style.fontFamily = 'monospace';
            p.innerHTML = 'PROGRESSING';

        }

        if (dataTrend == "upRightArrow")
        {
            goal.innerHTML = '<i class="fa fa-arrow-right" aria-hidden="true" style="position: center; font-size: 4.5rem; left: 60%; color: orange;"></i>';
            p.style.color = 'orange';
            p.style.position = 'absolute';
            p.style.fontSize = '1.1rem';
            p.style.left = '-30%';
            p.style.top = '100%';
            p.style.fontFamily = 'monospace';
            p.innerHTML = 'STAGNATING';
        }

        if (dataTrend == "downArrow")
        {
            goal.innerHTML = '<i class="fa fa-arrow-down" aria-hidden="true" style="position: center; font-size: 4.5rem; left: 60%; color: red;"></i>';  
            p.style.color = 'red';
            p.style.position = 'absolute';
            p.style.fontSize = '1.1rem';
            p.style.left = '-20%';
            p.style.top = '100%';
            p.style.fontFamily = 'monospace';
            p.innerHTML = 'DECREASING';
        }

        if (dataTrend == "none")
        {
            goal.innerHTML = '<i class="fa fa-plus" aria-hidden="true" style="position: center; font-size: 4.5rem; left: 60%; color: grey;"></i>';  
            p.style.color = 'gray';
            p.style.position = 'absolute';
            p.style.fontSize = '1.1rem';
            p.style.left = '-20%';
            p.style.top = '80%';
            p.style.fontFamily = 'monospace';
            p.innerHTML = 'Information\n Unavailable';
        }
        goal.appendChild(p); 
    }
}

// Call the loadEvents function to fetch and display the data
window.onload = getdata();