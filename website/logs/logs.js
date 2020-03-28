getData();

//=============== Sort Images ========================================
const selfies = [];

document.getElementById('time').addEventListener('click', event => {
    sortData((a, b) => b.time - a.time);
});

document.getElementById('mood').addEventListener('click', event => {
    sortData((a, b) => {
        if (b.mood > a.mood) return -1;
        else return 1;
    });
});

function sortData(compare) {
    for (let item of selfies) {
        item.elt.remove();
    }
    selfies.sort(compare);
    for (let item of selfies) {
        document.body.append(item.elt);
    }
}

//==============GET===================logs?====
// Moved from app.js

// How about publishing this to the page!
// We can rewrite the above code as
async function getData() {
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data) {
        const root = document.createElement('p');
        const mood = document.createElement('div');
        //const vegetable = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');

        //create the image node on the DOM
        const image = document.createElement('img');


        mood.textContent = `Mood: ${item.mood}`;
        //vegetable.textContent = `Favorite Veggie: ${item.vegetable}`;
        geo.textContent = `Lat: ${item.lat}°, Lon: ${item.lon}°`;
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;
        image.src = item.image64; // add the image source
        image.alt = "making faces on the cam"; // alt atrribute to the image

        root.append(
            mood,
            //vegetable, 
            geo,
            date,
            image); //append the image to root

        selfies.push({ elt: root, time: item.timestamp, mood: item.mood }); // add the sorted image

        document.body.append(root);

    }
    console.log(data); // then call this func above it
}