
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

        data.forEach(data => {
            
            if (data.id == 2) 
            {
                contaiedSpace.innerHTML += 
                `<div class="productcard" id="${data.id}"><div class="productcard-details"><img src="https://i.pinimg.com/564x/07/c4/e4/07c4e4eaa1a9e113637df71f75ef8949.jpg" class="image_market" > 
                  <p class="text-title">${data.title}</p><p class="text-body">${data.description}</p>
                  </div><button onclick="callAmazon('${data.title}')" class="productcard-button">More info</button></div>`;   

            }else
            {
                contaiedSpace.innerHTML += 
                `<div class="productcard" id="${data.id}"><div class="productcard-details"><img src="${data.imageUrl}" class="image_market" > 
                  <p class="text-title">${data.title}</p><p class="text-body">${data.description}</p>
                  </div><button onclick="callAmazon('${data.title}')" class="productcard-button">More info</button></div>`;    
            }

          
        });
        

    })
    .catch(error => {
        console.error('Error fetching data:', error);

    });
}

function callAmazon(title)
{
    console.log(title); 
    let url = "https://www.amazon.com/s?k=" +title;

    window.open(url, '_blank'); 
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Ensure event.js is loaded before this
    LoadAllElements();
});