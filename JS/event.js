// events.js

function loadEvents() {
    fetch('http://localhost:3000/events', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Output the data
        console.log('Data fetched from /api/events', data);

        // Assuming the data is an array of event objects
        const container = document.getElementById('events-container');
        container.innerHTML = ''; // Clear any existing content

        data.forEach(event => {
            const eventItem = document.createElement('section');
            eventItem.className = 'event-item';

            const timeDiv = document.createElement('div');
            timeDiv.className = 'time';
            timeDiv.innerHTML = `
                <h2>${new Date(event.Date).getDate()} <br><span>${new Date(event.Date).toLocaleString('default', { month: 'long' })}</span></h2>
            `;

            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'details';
            detailsDiv.innerHTML = `
                <h3>Where is the event happening?</h3>
                <p>${event.Location}</p>
                <a href="${event.Link}">View Details</a>
            `;


            eventItem.appendChild(timeDiv);
            eventItem.appendChild(detailsDiv);
            container.appendChild(eventItem);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

// Call the loadEvents function to fetch and display the data
window.onload = loadEvents;
