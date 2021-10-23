const weather={
  baseUrl:"http://api.openweathermap.org/data/2.5/weather",
  key:"644c836c8de63da7cfc1bf1b12a14cbc",
  unit:"metric",
  unknownValue:"NA",
  imageUrl:"http://openweathermap.org/img/wn/"
};
function present(){
  const location='gurugram';
   let url= `${weather.baseUrl}?q=${location}&units=${weather.unit}&APPID=${weather.key}`;
    alert(url);
  fetch(url).then((response) => {
   if (response.status === 200) {
     return response.json();
   }
   throw Error("Error fetching data.");
   
 })
 .then((data) => {
   updateDom(data);
 })
 .catch((error) => {
   console.error(error);
   alert(`Error getting information for ${location}`);
 });
}
present();
function getInformation(event){
    event.preventDefault();
    let location="gurugram";
   location = document.querySelector(".information-search-box .form")[0]
    .value;
    let url= `${weather.baseUrl}?q=${location}&units=${weather.unit}&APPID=${weather.key}`;
     
   fetch(url).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
    throw Error("Error fetching data.");
    
  })
  .then((data) => {
    updateDom(data);
  })
  .catch((error) => {
    console.error(error);
    alert(`Error getting information for ${location}`);
  });
}
function updateDom(data){
  const update=getDates();
  let day=document.querySelector(".weather .weather-information .date .day").innerHTML=update.day;
  let date=document.querySelector(".weather .weather-information .date .month").innerHTML=`${update.date} ${update.month} ${update.year}`;
  let location=document.querySelector(".weather .weather-information .location .city").innerHTML=`${data?.name} ${data?.sys?.country}`;
  let icon=document.querySelector(".weather .weather-information .temperature .temperature-image .img").setAttribute(
    "src",
    `${weather.imageUrl}${data?.weather?.[0]?.icon}.png`
  );
  let celcuis=document.querySelector(".weather .weather-information .temperature .celcius").innerHTML=`${parseInt(data?.main?.temp || 0)}&deg;C`;
  let tempType=document.querySelector(".weather .weather-information .temperature .temp-type").innerHTML=`${data?.weather?.[0]?.main || weather.unknownValue}`;
  let humdity=document.querySelector(".information .information-humidity .amount").innerHTML=`${parseInt(data?.main?.humidity || 0)}%`;
  let wind=document.querySelector(".information .information-wind .speed").innerHTML=`${parseInt(data?.wind?.speed || 0)}km/hr`;
  let visibility=document.querySelector(".information .information-visibility .amount").innerHTML=`${parseInt(data?.visibility || 0)}`;
  let avgTemp=document.querySelector(".information .information-avg-temp .amount").innerHTML=`${parseInt((data?.main?.temp_min || 0)+(data?.main?.temp_max ||0))}&deg;C`;

}
function getDates(){
  const days=[
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];
  const months=[
    "January",
    "Februaury",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d=new Date();
  const day=days[d.getDay()];
  const month=months[d.getMonth()];
  const date=d.getDate();
  const year=d.getFullYear();
   return{
     day,
     month,
     date,
     year
   };
 
}
 