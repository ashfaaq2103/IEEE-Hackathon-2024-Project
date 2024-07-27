document.addEventListener('DOMContentLoaded', () => {
    // Initialize the map centered on Mauritius
    const mapOptions = {
        center: { lat: -20.1607, lng: 57.5037 }, // Center on Mauritius
        zoom: 10
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    fetch('http://localhost:3000/api/map')
        .then(response => response.json())
        .then(events => {
            if (events.length > 0) {
                const bounds = new google.maps.LatLngBounds();

                events.forEach(event => {
                    // Parse and validate latitude and longitude
                    const latitude = parseFloat(event.Latitude);
                    const longitude = parseFloat(event.Longitude);

                    if (isNaN(latitude) || isNaN(longitude)) {
                        console.error('Invalid latitude or longitude:', event);
                        return; // Skip this marker
                    }

                    const isUpcoming = new Date(event.Date) > new Date();
                    const markerColor = isUpcoming ? 'green' : 'red';

                    const marker = new google.maps.Marker({
                        position: { lat: latitude, lng: longitude },
                        map: map,
                        title: event.Details,
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            fillColor: markerColor,
                            fillOpacity: 0.8,
                            strokeWeight: 0,
                            scale: 6
                        }
                    });

                    const infoWindow = new google.maps.InfoWindow({
                        content: `
                            <strong>${event.Details || 'No details available'}</strong><br>
                            Date: ${new Date(event.Date).toLocaleDateString()}<br>
                            ${event.Link ? `<a href="${event.Link}" target="_blank">View Details</a>` : 'No link available'}
                        `
                    });

                    marker.addListener('click', () => {
                        infoWindow.open(map, marker);
                    });

                    bounds.extend(marker.getPosition());
                });

                map.fitBounds(bounds);
            } else {
                console.log('No events available to display.');
            }
        })
        .catch(error => {
            console.error('Error fetching events:', error);
        });
});
