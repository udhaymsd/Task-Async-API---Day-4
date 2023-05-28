const rest_countries_url = "https://restcountries.com/v3.1/all";
const body = document.getElementsByTagName("body");
const content = document.querySelector(".content_body");

const get_countries_data = async () => {
  const request = await fetch(rest_countries_url, { method: "GET" });
  const data = await request.json();
  console.log(data);
  const dropDown = document.querySelector(".dropdown-menu");

  data.map((ele) => {
    const list = document.createElement("li");
    list.setAttribute("class", "dropdown-item");
    list.setAttribute("onClick", "get_individual_data(this)");
    list.innerHTML = ele.name.common;

    dropDown.append(list);
  });
};
const get_individual_data = async (e) => {
  const rest_country_data = `https://restcountries.com/v3.1/name/${e.innerHTML}`;
  const country_data = async () => {
    const country_request = await fetch(rest_country_data);
    const country_data = await country_request.json();

    
    country_data.map((ele) => {
      const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${ele.latlng[0]}&lon=${ele.latlng[1]}&appid=a67eddf29a637086f30698223033c4f9`;
      const weather_info = async () => {
        const weather_request = await fetch(weatherApi);
        const weather_data = await weather_request.json();
        console.log(weather_data);
        const card = document.createElement("div");
        card.setAttribute("class", "card");
        card.innerHTML = `<img src=${ele.flags.png} class="image card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${ele.name.common}</h5>
        <div class="rest_country">
        <p class="card-text">
          Capital : ${ele.capital[0]}
        </p>
        <p class="card-text">
          Region : ${ele.region}
        </p>
        <p class="card-text">
          Country Code : ${ele.cca2}
        </p>
        <div  class="weather">
          <p class="card-text" >
            Condition : ${weather_data.weather[0].description}
          </p>
          <p class="card-text1" id="weather_info">
            Wind Direction : ${weather_data.wind.deg}
          </p>
          <p class="card-text" id="weather_info">
            Wind Speed : ${weather_data.wind.speed}
          </p>
          </div>`;
        content.append(card);
      };
      weather_info();
      
    });
 
  };
  country_data();
};
get_countries_data();
