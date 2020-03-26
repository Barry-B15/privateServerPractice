// Exercise to add a submit btn
let lat, lon; // 1st declare the variables
const button = document.getElementById('submit'); //def a constant button
// add a click listener to the btn
button.addEventListener('click', async event => {
    // move the data an header into the listener
    const data = {
        lat,
        lon
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const response = await fetch('api', options);
    const json = await response.json();
    console.log(json);
});
//Remake the if sentence
if ('geolocation' in navigator) {
    /* geolocation is available */
    console.log('Geolocation is available');
    // If geolocation is available, get current pos 
    // again copy from MDN doc
    navigator.geolocation.getCurrentPosition(async position => {
        //Instead of just logging, we can now put this on the website
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        document.getElementById('latitude').textContent = lat;
        document.getElementById('longitude').textContent = lon;
    });
} else {
    /* geolocation IS NOT available */
    console.log('Geolocation is not available');
}