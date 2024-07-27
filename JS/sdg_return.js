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
        getSdgdata(dataSdg)
    })
    .catch(error => {
        console.error('Error fetching data:', error);

    });
}

// Define the getdata function
async function getSdgdata(dataSdg) {
    fetch('http://localhost:3000/api/sdgData', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Output the data
        // console.log('Data fetched from /api/sdgData:', data);

        // You can also store the data in variables if needed
        let sdgData = data;
        
        const container = document.getElementById('separator-3'); 
        container.innerHTML = ''; 
        data.forEach(sdg => {
            const cardNew = document.createElement('div')
            cardNew.className = 'card'; 
            cardNew.id = 'rotate_card'; 
            
            let contain = 
            `<div class="card" id="rotate_card"
                style="--front-bg-color: #E5243B; --back-bg-color: #E5243B; --front-border-color: #E5243B; --back-border-color: #E5243B;">
                <div class="card-inner">
                    <div class="card-front">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Sustainable_Development_Goal_01NoPoverty.svg/1200px-Sustainable_Development_Goal_01NoPoverty.svg.png"
                            alt="No poverty" width="120px" height="120px">
                        <i class="fa fa-arrow-up" aria-hidden="true" style="position: absolute; font-size: 4.5rem; left: 60%; color: rgb(18, 199, 18);"></i>
                    </div>
                    <div class="card-back">
                        <h2>Goal 1</h2>
                        <p style="color: antiquewhite;">End poverty in all its forms everywhere</p>
                    </div>
                </div>
            </div>`; 

            container.append(contain); 
        })
        
        
        
        // renderAllSdg(dataSdg, sdgData); 
    })
    .catch(error => {
        console.error('Error fetching data:', error);

    });
}


// Call the loadEvents function to fetch and display the data
window.onload = getdata;