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
    Clear: '<img src="images/clear1.png" alt="Clear">',
    Rain: '<img src="images/rain2.png" alt="rain">',
    Clouds: '<img src="images/clopud1.png" alt="Cloudy">',
    snow: "❄️",
    Thunderstorm: '<img src="images/thunder1.png" alt="Thunderstorm">',
    Drizzle: '<img src="images/clopud1.png" alt="Cloudy">'
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

setInterval(() => {
  document.getElementById("Ctime").textContent =
    new Date().toLocaleString("en-US", {
      weekday: "long",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
}, 1000); // setInterval is auto update 1000 is ms-> 1sec



async function getweather() {
    try {
         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("Error");

        }


        const data = await response.json()
        console.log(data);

        const ftemp = data.main.feels_like
        const city = data.name
        const time1 = data.timezone
        const iconweb = data.weather[0].icon
        const iconurl = `https://openweathermap.org/img/wn/${iconweb}@2x.png` // connect with const iconweb



        const weat = data.weather[0].main // from the api, data.weather is an array,  take [0] because it is the current condition by the api
        const iconw = wicon[weat]
        const iconw1 = wicon1[weat]

        //document.getElementById("Cweather").src = iconurl

            const temp = data.main.temp
             document.getElementById("Ctemp").textContent = temp + "°C"

        //document.getElementById("Ctime").textContent = dayofw + CHour



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
        const dayfor = data2.daily.time;HumidV1
        const tempmin = data2.daily.temperature_2m_min;
        const tempmax = data2.daily.temperature_2m_max;
        const UV = data2.daily.uv_index_max[0];
        const wind = data2.daily.windspeed_10m_max[0];
        const sunrise = data2.daily.sunrise[0]
        const sunset = data2.daily.sunset[0]
        const weathercode = data2.daily.weathercode

        const daynamez = document.getElementsByClassName('dayz')
        for( let i = 0; i < dayfor.length; i++){
        const datefor = new Date (dayfor[i])
        const dayname = datefor.toLocaleDateString("en-US", {weekday: "short"})
        daynamez[i].textContent = dayname;
        }
        const tempH = document.getElementsByClassName('Temp')
        for (let z = 0; z < tempmin.length && tempmax.length; z++){
        tempH[z].textContent = Math.round(tempmin[z]) + "°C - " + Math.round(tempmax[z]) + "°C"
        }
        

        const sunhour = new Date(sunrise);
        const sunc = sunhour.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
        document.getElementById('SunriseT').textContent = sunc
        const sunhour1 = new Date(sunset);
        const sunc1 = sunhour1.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
        document.getElementById('SunsetT').textContent = sunc1

        const weatherforcastlink = document.getElementsByClassName('Icon')
         
        function Weathertype(weathercode){
            weathercode = Number(weathercode); 
            if ([0,1].includes(weathercode)) return "images/clear1.png";
            if ([2, 3].includes(weathercode)) return "images/clopud1.png";
            if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weathercode)) return "images/rain1.png";
            //if ([61,63,65,66,67].includes(weathercode)) return "images/rain2.png";
            if ([95,96,99].includes(weathercode)) return "images/thunder1.png";
            return "images/zin1199.jpg";

        }

                       //Clear: '<img src="images/clear1.png" alt="Clear">',
                       //Rain: '<img src="images/rain2.png" alt="rain">',
                       //Clouds: '<img src="images/clopud1.png" alt="Cloudy">',
                       //snow: "❄️",
                       //Thunderstorm: '<img src="images/thunder1.png" alt="Thunderstorm">',
                       //Drizzle: '<img src="images/clopud1.png" alt="Cloudy">'
        for (let q = 0; q < weathercode.length; q++){
            weatherforcastlink[q].src = Weathertype(weathercode[q])
        }
    



        //document.getElementsByClassName("dayz1").textContent = dayforcast


    }
    catch (er) {
        console.log(er)
    }
    try {
      const response3 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=11.5564&longitude=104.9282&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,visibility,uv_index&timezone=auto`)
      if (!response3.ok) {
            throw new Error("Error");

        }
        const data3 = await response3.json();
        console.log(data3)

        const now = new Date();
        const hour6 = now.getHours();


        const UV = data3.hourly.uv_index[hour6];
        document.getElementById('UVv').textContent = UV 
        let uvValue = UV;
        let maxUv = 11;
        let percentage = (uvValue / maxUv) * 100;
        document.getElementById('UVc').style.width = percentage + '%';
        
        const wind = data3.hourly.wind_speed_10m[hour6]
        document.getElementById('WindV').textContent = wind

        const Humid = data3.hourly.relative_humidity_2m[hour6]
        document.getElementById('HumidV1').textContent = Humid
        
        function Hstatus(status){
            if (status < 20) return { label: "Very dry", color: "#f9844a" };
            if (status < 40) return { label: "Dry", color: "#f9d857" };
            if (status <60) return { label: "Comfortable", color: "#90be6d" };
            if (status < 80) return { label: "Humid", color: "#4ea8de" };
            return { label: "Very humid", color: "#4361ee" };

        }
        const CHumid = Hstatus(Humid);
        document.getElementById('HumidS2').textContent = (CHumid.label);
        document.getElementById('HumidS2').style.color = (CHumid.color);
        let HValue = Humid;
        let maxH = 100;
        let percentage1 = (HValue / maxH) * 100;
        document.getElementById('RHumidBar').style.bottom = percentage1 + '%';

        const Visapi = data3.hourly.visibility[hour6]
        const Vis = (Visapi / 1000)
        document.getElementById('VisV1').textContent = Vis
        
        function Vstatus(status1){
            if (status1 > 10000) return { label: "Very Clear", color: "#90be6d" };
            if (status1 > 5000) return { label: "Clear", color: "#f9d857" };
            if (status1 >1000) return { label: "Hazy", color: "#f9844a" };
            if (status1 > 200) return { label: "Heavy Haze", color: "#f94144" };
            if (status1 < 200) return { label: "Fog", color: "#7209b7" };

        }
        const CVis = Vstatus(Visapi);
        document.getElementById('VisS2').textContent = (CVis.label);
        document.getElementById('VisS2').style.color = (CVis.color);
        let VValue = Vis;
        let maxV = 100;
        let percentage2 = (VValue / maxV) * 100;
        document.getElementById('RVisBar').style.top = percentage2 + '%';






 


    }
    catch (er) {
        console.log(er)
    }
    try{
        const response4 = await fetch(`https://api.waqi.info/feed/geo:11.5564;104.9282/?token=a493bacfc1270cc1760c13298c28336652565c78`)
        if (!response4.ok) {
            throw new Error("Error");

        }
        const data4 = await response4.json();
        console.log(data4)

        const Air = data4.data.aqi

        document.getElementById('AirV1').textContent = Air
        
        function Astatus(status2){
            if (status2 > 300) return { label: "Hazardous", color: "#7E0023" };
            if (status2> 200) return { label: "Very Unhealthy", color: "#8F3F97" };
            if (status2 >150) return { label: "Unhealthy", color: "#FF0000" };
            if (status2 > 100) return { label: "Unhealthy for Sensitive Groups", color: "#FF7E00" };
            if (status2 > 50) return { label: "Moderate", color: "#FFFF00" };
            if (status2 > 0) return { label: "Good", color: "#00E400" };

        }
        const CAir = Astatus(Air);
        document.getElementById('AirS2').textContent = (CAir.label);
        document.getElementById('AirS2').style.color = (CAir.color);
        let AValue = Air;
        let maxA = 500;
        let percentage3 = (AValue / maxA) * 100;
        document.getElementById('RAirBar').style.bottom = percentage3 + '%';




    
    
    
    
    
    
    
    
    
    
    
    
    }
catch (er) {
        console.log(er)
    }
    try{
        const response5 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=11.5564&longitude=104.9282&hourly=temperature_2m,precipitation,weathercode&timezone=auto`)
        if (!response5.ok){
            throw new Error("Error");
        }
        const data5 = await response5.json();
        const now = new Date();
        const hour7 = now.getHours();
        
        
        console.log(data5)
        
        const currentweather = data5.hourly.weathercode[hour7]
        const currentWicon = document.getElementById('Cweather')
        function Weathertype1(currentweather){
            currentweather = Number(currentweather); 
            if ([0,1].includes(currentweather)) return "images/clear1.png";
            if ([2, 3].includes(currentweather)) return "images/clopud1.png";
            if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(currentweather)) return "images/rain1.png";
            //if ([61,63,65,66,67].includes(weathercode)) return "images/rain2.png";
            if ([95,96,99].includes(currentweather)) return "images/thunder1.png";
            return "images/zin1199.jpg";

        }

        currentWicon.src = Weathertype1(currentweather);
    
    
    
    
    
    
    }
catch (er) {
        console.log(er)
    }
}
getweather();
setInterval(getweather, 60000000);

const input = document.querySelector('.searchinput');
const resultp = document.getElementById('resultP');
input.addEventListener('input', () => {
  const city2 = input.value.trim();
  if (city2.length < 2){ 
    resultp.innerHTML = ''
    return};
  getcord(city2);
});


async function getcord(cityname) {
    
    try{
        const cordresponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityname}`);
        const cortdata = await cordresponse.json();
        console.log(cortdata)

        resultp.innerHTML='';
        
        cortdata.results?.slice(0, 15).forEach(place => {
          const item = document.createElement('div');
          item.classList.add('result-item');
          item.textContent = `${place.name}, ${place.country}`;
          resultp.appendChild(item);
        });
    }
    
  catch (er) {
        console.log(er)
    }
}

