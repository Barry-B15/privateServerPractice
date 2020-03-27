//1st add express to run server
const express = require('express');

const Datastore = require('nedb'); // require nedb SD 1

const app = express(); //2. start an instance of app
const port = 8080;
app.use(express.static('website'));

// see: https://expressjs.com/ja/api.html
app.use(express.json({ limit: '1mb' }));

//const allData = []; // for btn ex

const database = new Datastore('database.db'); // create the db SD 2
database.loadDatabase(); // create the db locally SD 3
//now insert data into the db SD4
/* 
database.insert({ name: 'Gbene Zini', status: 'surfing' });
database.insert({ name: 'The Boss', status: 'training' });
 */


app.listen(port, () => console.log(`Listening at localhost: ${port}`));

// create a get request to handle GET 
app.get('/api', (request, response) => {
    //response.json({ test: 123 }); // lets just test if it works 1st

    //Now let's use the find() func to get the actual data
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});

//7. POST request to send data from client
app.post('/api', (request, response) => {
    //console.log(request); // 1st log the request and see
    //console.log('This is the request data');
    //console.log(request.body); 

    const data = request.body; //this + data.

    //for btn ex
    /* allData.push(data);
    response.json(allData);
    console.log(allData); */

    // add a timestamp for the time when data is added SD 6
    const timestamp = Date.now();
    data.timestamp = timestamp;

    database.insert(data); // insert user data to db SD5
    //console.log(database) // instead of logging body add the timestamp to the response.json

    /* response.json({
        status: 'success',
        timestamp: timestamp, // add the timestamp to what we r sending back to the client SD6b
        latitude: data.lat, //request.body.lat,
        longitude: data.lon //request.body.lon //
    }); */
    // replace the above with a shorter one
    response.json(data);
});