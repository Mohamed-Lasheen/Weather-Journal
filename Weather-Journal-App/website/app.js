// Global Variables that will be needed throughout the app 
const apiKey = '&appid=2b20d0f296360ee9f6d5852ee5466dd8&units=imperial';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const feelingsElement = document.getElementById('feelings');
const generationButton = document.getElementById('generate');

/* Creating a new date instance dynamically using JS 
   and storing the date of the user's entry in today */
const date = new Date();
const today = `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;

// Generating data by submitting/clicking the generationButton
generationButton.addEventListener('click', () => {
    /* Getting weather temperature by obtaining the user's data
       and using the weather app API */
    const zipCode =  document.getElementById('zip').value;
    receiveWeatherTemp(`${baseURL}${zipCode}${apiKey}`)
        .then(function(data) {
             
            // Sending each item to the server
            sendDataToServer({
                temp: data.main.temp,
                date: today,
                feelings: feelingsElement.value
            });
        })
        // Updating the UI once the server has received the data
        .then(function() {
            UpdateUI();
        });
});
// Receiving the weather temperatures from the user
async function receiveWeatherTemp(url) {
    const request = await fetch(url);
    try {
        const data = await request.json()
        return data;
    } catch (error) {
        console.log("Couldn't receive data.", error)
    }
}

// Sending data to the server
async function sendDataToServer(data = {}) {
    // Fetching request to obtain the data from the user
    const request = await fetch('/sendData', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const result = await request.json();
        return result;
    } catch (error) {
        console.log("Couldn't obtain the request.", error);
    }
}

// Updating UI dynamically
async function UpdateUI() {
    const request = await fetch('/getData')

    try {
        const data = await request.json();
        const {
            date,
            temp,
            feelings
        } = data;
        console.table({
            date,
            temp,
            feelings
        });
        document.getElementById('temp').innerHTML = temp + ' degrees';
        document.getElementById('date').innerHTML = date;
        document.getElementById('content').innerHTML = feelings;

    } catch (error) {
        console.log("Couldn't fetch the data from the server.", error);
    }
}