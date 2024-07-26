document.addEventListener('DOMContentLoaded', () => {
    // Simulate content loading completion
    setTimeout(() => {
        document.querySelector('.loader-container').classList.add('loader-hidden');
    }, 2000); // Adjust timeout as needed

    document.querySelector('.loader-container').addEventListener('transitionend', (event) => {
        if (event.propertyName === 'opacity') {
            // Remove loader-container after opacity transition ends
            document.querySelector('.loader-container').remove();
        }
    });
});
