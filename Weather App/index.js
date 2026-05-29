// // * main section elements
// const input = document.querySelector(".input");
// const location1 = document.getElementById("location");
// const time = document.getElementById("time");
// const weaType = document.getElementById("wea-type");
// const weaImage = document.getElementById("wea-image");
// const weaTemp = document.getElementById("wea-temp");
// const weaMinMax = document.getElementById("wea-minMax");

// //* data section elements
// const feels = document.getElementById("feels");
// const humidity = document.getElementById("humidity");
// const windData = document.getElementById("wind");
// const pressure = document.getElementById("pressure");



// // const getWeatherData = async (location)=>{

// //     const apiID = "95fbda84d5e2d3353553f2f4ee12578c";
// //     // const apiUrl = `httpss://api.openweathermap.org/data/2.5/weather?id=${location1}&appid=95fbda84d5e2d3353553f2f4ee12578c`;
// //     const apiUrl = `httpss://api.openweathermap.org/data/2.5/weather?q=${location}&appid=95fbda84d5e2d3353553f2f4ee12578c`;
// //     try{

// //         const res = await fetch(apiUrl);
// //         console.log(res);
// //         const weaData = await res.json();
// //         console.log(weaData);
        

        
// //     }catch(error){
// //         console.log(error);
        
// //     }
// // }

// console.log(input.value);



// //! getting the country name from code
// const getCountry = (cCode) =>{
//     const EngName =  new Intl.DisplayNames([cCode], { type: "region" });
//     console.log(typeof EngName.of(cCode));

//     let countryName = EngName.of(cCode);
    
//     return countryName;

// }

// const getTimeDate = (dt) => {
//     const options = {
//             weekday : "long",
//             year : "numeric",
//             month : "long",
//             day : "numeric",
//             hour : "numeric",
//             minute : "numeric",
//         }

//         // console.log("snfvkjsnvkj");
//         const formatter = new Intl.DateTimeFormat("en-US", options);
//         return formatter.format(dt);
// }

// let city = "cuttack";

// //* search functionality
// document.querySelector(".search").addEventListener("submit",(e)=>{
//     e.preventDefault();
//     city = input.value;

//     getWeatherData(city);
//     input.value = "";

// })


// const getWeatherData = async (location) =>{
//     const apiID = "95fbda84d5e2d3353553f2f4ee12578c";
//     // const apiUrl = `httpss://api.openweathermap.org/data/2.5/weather?id=${location1}&appid=95fbda84d5e2d3353553f2f4ee12578c`;
//     const apiUrl = `httpss://api.openweathermap.org/data/2.5/weather?q=${city}&appid=95fbda84d5e2d3353553f2f4ee12578c`;

//     try{
//         const res = await fetch(apiUrl);
//         console.log(res);
//         const data = await res.json();
//         console.log(data);
        
//         //* destructuring the data object
//         const {main, name, weather, wind, sys, dt} = data;
        
//         //todo    internationalization API in js

//         //* fill the city name and country
//         // const country = getCountry(sys.country);
//         location1.textContent = `${name}, ${getCountry(sys.country)}`;

//         // * Format date and time -> dt is in seconds(convert it into miliseconds)
//         time.textContent = getTimeDate(dt*1000);
        

//         // * weather data
//         weaType.textContent = `${weather[0].main}`;
//         const wea_icon = weather[0].icon;
//         weaImage.innerHTML = `<img src="https://openweathermap.org/img/wn/${wea_icon}@4x.png">`;

//         weaTemp.innerHTML = `${main.temp}&#176`;
//         weaMinMax.innerHTML = `Min: ${main.temp_min.toFixed()}&#176      Max: ${main.temp_max.toFixed()}&#176`;

//         //* Other information
//         feels.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
//         humidity.innerHTML = `${main.humidity.toFixed()}%`;
//         windData.innerHTML = `${wind.speed}`;
//         pressure.innerHTML = `${main.pressure}&#176`;
        
        
//     }
//     catch(error){
//         console.log("Data not found");

        
//     }
// }

// document.body.addEventListener("load",getWeatherData("pune"));










// ! practice

//* main section datas
const input = document.querySelector(".input");
const cityName = document.getElementById("location");
const time = document.getElementById("time");
const weaType = document.getElementById("wea-type");
const weaImage = document.getElementById("wea-image");
const weaTemp = document.getElementById("wea-temp");
const weaMinMax = document.getElementById("wea-minMax");

//* data section elements
const feels = document.getElementById("feels");
const humidity = document.getElementById("humidity");
const windData = document.getElementById("wind");
const pressure = document.getElementById("pressure");

// * City search functionality

let city = "cuttack";
document.querySelector(".search").addEventListener("submit",(e)=>{
    e.preventDefault();
    city = input.value;

    getWeatherData(city);
    input.value = "";
})


// convert country code to name 
const getCountry = (code )=>{
    const country = new Intl.DisplayNames(["en"], { type: "region" }).of(code);

    return country;
}
const getDateTime = (dt)=>{

    const Options = {
        weekday : "long",
        year : "numeric",
        month : "long",
        day : "numeric",
        hour : "numeric",
        minute : "numeric",
    }
    return new Intl.DateTimeFormat("en-US",Options).format(dt);
}

const getWeatherData = async (city)=>{
    const apiUrl = `httpss://api.openweathermap.org/data/2.5/weather?q=${city}&appid=95fbda84d5e2d3353553f2f4ee12578c`;

    try{
        const data =await fetch(apiUrl);
        // console.log(data);
        const dataMembers = await data.json();
        console.log(dataMembers);


        const {dt,main,name,sys,weather,wind} = dataMembers;   
        
        // * Display the city name along with its country code using the provided API data.
        cityName.textContent = `${name}, ${getCountry(sys.country)}`;

        // * Format the timestamp provided by the API into a human-readable date and time format.
        time.textContent = `${getDateTime(dt*1000)}`;
        

        // *Display additional weather details such as temperature, minimum and maximum temperature, feels like temperature, humidity, wind speed, and pressure.
        weaTemp.innerHTML = `${main.temp}&#176`
        weaMinMax.innerHTML = `Min: ${main.temp_min}&#176  Max: ${main.temp_max}&#176`;

        // * extra information
        feels.innerHTML = `${main.feels_like}&#176`;
        humidity.innerText = `${main.humidity}%`;
        pressure.textContent = `${main.pressure}hPa`;
        windData.textContent = `${wind.speed}`;

        // *cloud information
        weaType.textContent = `${weather[0].main}`
        const wea_icon = `${weather[0].icon}`; 
        weaImage.innerHTML = `<img src = "https://openweathermap.org/img/wn/${wea_icon}@4x.png">`

    }catch(e){
        console.log("Data not found");
        
    }


}

document.body.addEventListener("load",getWeatherData(city));


