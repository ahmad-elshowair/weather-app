
/* Global Variables */
const api_key = "986003278e349e7c81ebe297933c092c";
const date_place = document.querySelector('#date');
const temperature_place = document.querySelector('#temp');
const feel_place = document.querySelector('#content');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// get the generator button 
const generate_btn = document.querySelector('#generate');

// add an event listener to the btn of click 
generate_btn.addEventListener('click', get_info);

// the call back function of event listener
function get_info(e) {
    // prevent the default 
    e.preventDefault();

    // get the value of the zip code
    const zip_code = document.querySelector('#zip').value;

    // get the value of feeling 
    const feel = document.querySelector('#feelings').value;
    // set the full url 
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip_code}&appid=${api_key}&units=metric`;

    if (zip_code.value !== "" || feel.value !== "") {
        get_temperature(url)
            .then(temp => post_data('/postData', {
                temperature: temp,
                date: newDate,
                feeling: feel
            })).then(() => {
                return get_data('/all');
            }).then((data) => update_ui(data));
    } else {
        alert('enter you zip code');
    }

}


// function to get data from external Web API
const get_temperature = async (url) => {
    const request = await fetch(url);
    try {
        const temp_data = await request.json();
        const temp = temp_data.main.temp;
        return temp;
    } catch (error) {
        console.log('error just occurred: ', error);
    }
}


// function to post data to Project data 
const post_data = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    try {
        const all_data = await response.json();
        return all_data;
    } catch (error) {
        console.log('error just occurred:\n', error);
    }
};

// function to get data from project data
const get_data = async (url) => {
    const response = await fetch(url);
    try {
        const all_data = await response.json();
        console.log(all_data);
        return all_data;
    } catch (error) {
        console.log('error just occurred: \n', error);
    }
};

// function to update UI elements 
const update_ui = async () => {
    const request = await fetch('/all');
    try {
        const all_data = await request.json();
        date_place.innerHTML += all_data.date;
        temperature_place.innerHTML += all_data.temperature;
        feel_place.innerHTML += all_data.feeling;
    } catch (error) {
        console.log('error just occurred:\n', error);
    }
}