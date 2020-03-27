// Exercise to add a submit btn
let lat, lon; // 1st declare the variables
const button = document.getElementById('submit'); //def a constant button
// add a click listener to the btn
button.addEventListener('click', async event => {
    // move the data an header into the listener

    //def a new const for vegetable
    const vegetable = document.getElementById('vegetable').value;
    const mood = document.getElementById('mood').value;

    const data = {
        lat,
        lon,
        vegetable, // add the veg to data
        mood
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

//==============GET=======================
getData(); // call the func we just created

//fetch('/api'); // fetch the data
//lets put our fetch() in an async func and store the result as response
/* async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data); // then call this func above it
} */
// How about publishing this to the page!
// We can rewrite the above code as
async function getData() {
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data) {
        const root = document.createElement('div');
        const mood = document.createElement('div');
        const vegetable = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');

        mood.textContent = `Mood: ${item.mood}`;
        vegetable.textContent = `Favorite Veggie: ${item.vegetable}`;
        geo.textContent = `Lat: ${item.lat}°, Lon: ${item.lon}°`;
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;

        root.append(mood, vegetable, geo, date);
        document.body.append(root);

    }
    console.log(data); // then call this func above it
}


//======================END GET

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