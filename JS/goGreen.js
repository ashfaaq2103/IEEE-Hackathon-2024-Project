
 function LoadAllElements()
{
    fetch('http://localhost:3000/api/SendProductData', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Output the data
        console.log(data);
        
        let contaiedSpace = document.getElementById('separator-3'); 
        console.log(contaiedSpace); 
        contaiedSpace.innerHTML = '<div id="separator-3" class="container" style="width: 100%; max-width: 100%;">'; 

        data.forEach(event => {
            
        });
        // <div class="productcard" id="4">
        //         <div class="productcard-details">
        //             <img src="https://i.pinimg.com/564x/25/e4/57/25e457230e48e9932913033211ba0c24.jpg" class="image_market" >
        //             <p class="text-title">Zero Waste Concealer</p>
        //             <p class="text-body">A concealer that comes in eco-friendly packaging, designed to reduce waste.</p>
        //         </div>
        //         <button class="productcard-button">More info</button>
        //     </div>

    })
    .catch(error => {
        console.error('Error fetching data:', error);

    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Ensure event.js is loaded before this
    LoadAllElements();
});