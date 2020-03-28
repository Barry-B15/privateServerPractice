//To use p5, let's move all the codes to a setup() function
function setup() {
    //background(255,0,0); // test, refresh to see p5js canvas
    noCanvas(); // we don't need a canvas so replace the above
    const video = createCapture(VIDEO); // get the video tp capture images
    video.size(320, 240); // resize video, refresh

    // Exercise to add a submit btn
    let lat, lon; // 1st declare the variables
    const button = document.getElementById('submit'); //def a constant button
    // add a click listener to the btn
    button.addEventListener('click', async event => {
        // move the data an header into the listener

        //def a new const for vegetable
        /* const vegetable = document.getElementById('vegetable').value;*/
        const mood = document.getElementById('mood').value;

        // for image
        video.loadPixels(); // load the img pixels for conversion
        const image64 = video.canvas.toDataURL(); // convert the image data 
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
        // https://developer.mozilla.org/en-US/docs/Glossary/Base64

        const data = {
            lat,
            lon,
            //vegetable, // add the veg to data
            mood,
            image64 // add the image to data set
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
}