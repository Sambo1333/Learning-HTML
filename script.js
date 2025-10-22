const apage = document.getElementById("Art") // locate #Art from index.html \\ apage = index.html/#Art
function Apage() {
    window.location.href = "artpage.html" // add an action/function for/after click
}
apage.addEventListener("click", Apage) // wait for an event(click) , then add the function in


const hpage = document.getElementById("Home")
function Hpage() {
    window.location.href = "index.html"
}
hpage.addEventListener("click", Hpage)

const cvpage = document.getElementById("CV")
function CVpage() {
    window.location.href = "cvpage.html"
}
cvpage.addEventListener("click", CVpage)

const abpage = document.getElementById("About")
function ABpage() {
    window.location.href = "aboutpage.html"
}
abpage.addEventListener("click", ABpage)

const apiKey = "ed43656b6dfec81ed9717077bab1f999";
const lat = 11.5564;
const lon = 104.9282; // phnompenh
const wicon1 = {
    Clear: "☀️",
    Rain: '<img src="images/rain2.png" alt="rain">',
    Clouds: '<img src="images/clopud1.png" alt="Cloudy">',
    snow: "❄️",
    Thunderstorm: "⚡",
    Drizzle: "🌧️"
}
const wicon = {
    Clear: "Sunny☀️",
    Unknown: "unknown",
    Rain: "Raining🌧️",
    Clouds: "Cloudy☁️",
    snow: "Snow❄️",
    Thunderstorm: "ThunderStorm⚡",
    Drizzle: "🌧️"
} // variable holds object


const date = new Date();
const dayow = date.getDay();
const dayows = {
    0: "Sunday, ",
    1: "Monday, ",
    2: "Tuesday, ",
    3: "Wednesday, ",
    4: "Thursday, ",
    5: "Friday, ",
    6: "Saturday, "
}
const dayofw = dayows[dayow]
const Hour1 = date.getHours();
let Mn1 = date.getMinutes(); {
    if (Mn1 < 10) {
        Mn1 = "0" + Mn1;
    }
}
const Hour2 = {
    0: "12:" + Mn1 + "am",
    1: "1:" + Mn1 + "am",
    2: "2:" + Mn1 + "am",
    3: "3:" + Mn1 + "am",
    4: "4:" + Mn1 + "am",
    5: "5:" + Mn1 + "am",
    6: "6:" + Mn1 + "am",
    7: "7:" + Mn1 + "am",
    8: "8:" + Mn1 + "am",
    9: "9:" + Mn1 + "am",
    10: "10:" + Mn1 + "am",
    11: "11:" + Mn1 + "am",
    12: "12:" + Mn1 + "pm",
    13: "1:" + Mn1 + "pm",
    14: "2:" + Mn1 + "pm",
    15: "3:" + Mn1 + "pm",
    16: "4:" + Mn1 + "pm",
    17: "5:" + Mn1 + "pm",
    18: "6:" + Mn1 + "pm",
    19: "7:" + Mn1 + "pm",
    20: "8:" + Mn1 + "pm",
    21: "9:" + Mn1 + "pm",
    22: "10:" + Mn1 + "pm",
    23: "11:" + Mn1 + "pm"
}
const CHour = Hour2[Hour1]





async function getweather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("Error");

        }


        const data = await response.json()
        console.log(data);
        const temp = data.main.temp
        const ftemp = data.main.feels_like
        const city = data.name
        const time1 = data.timezone
        const iconweb = data.weather[0].icon
        const iconurl = `https://openweathermap.org/img/wn/${iconweb}@2x.png` // connect with const iconweb



        const weat = data.weather[0].main // from the api, data.weather is an array,  take [0] because it is the current condition by the api
        const iconw = wicon[weat]
        const iconw1 = wicon1[weat]

        document.getElementById("Cweather").src = iconurl
        document.getElementById("Ctemp").textContent = temp + "°C"
        document.getElementById("Ctime").textContent = dayofw + CHour



    } catch (err) {
        console.log(err)
    }
    try {
        const response2 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=11.5564&longitude=104.9282&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode,uv_index_max,windspeed_10m_max,sunrise,sunset&timezone=auto&forecast_days=7`);
        if (!response2.ok) {
            throw new Error("Error");

        }

        const data2 = await response2.json();
        console.log(data2)
        const dayfor = data2.daily.time;
        const tempmin = data2.daily.temperature_2m_min;
        const tempmax = data2.daily.temperature_2m_max;
        const UV = data2.daily.uv_index_max[0];
        const wind = data2.daily.windspeed_10m_max[0];
        

        const daynamez = document.getElementsByClassName('dayz')
        for( let i = 0; i < dayfor.length; i++){
        const datefor = new Date (dayfor[i])
        const dayname = datefor.toLocaleDateString("en-US", {weekday: "short"})
        daynamez[i].textContent = dayname;
        }
        const tempH = document.getElementsByClassName('Temp')
        for (let z = 0; z < tempmin.length && tempmax.length; z++){
        tempH[z].textContent = tempmin[z] + "°C - " + tempmax[z] + "°C"
        }



        //document.getElementsByClassName("dayz1").textContent = dayforcast


    }
    catch (er) {
        console.log(er)
    }




}
getweather();
