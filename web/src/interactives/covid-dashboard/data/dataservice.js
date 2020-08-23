import axios from "axios";

// api_url = 'https://documenter.getpostman.com/view/11144369/Szf6Z9B3?version=latest'

const jhu_url = "https://corona.lmao.ninja/v2/";

const covid_url = "https://covidtracking.com/api/";

export const fetchHistData = async (country) => {
  try {
    if (country === "all") {
      const {
        data: { cases, deaths, recovered },
      } = await axios.get(`${jhu_url}historical/${country}?lastdays=all`);
      return { cases, deaths, recovered };
    } else {
      const {
        data: {
          timeline: { cases, deaths, recovered },
        },
      } = await axios.get(`${jhu_url}historical/${country}?lastdays=all`);
      return { cases, deaths, recovered };
    }
  } catch (error) {
    console.log("error");
  }
};

const fetchCountryData = async (type) => {
  try {
    const { data } = await axios.get(`${jhu_url}jhucsse`);
    return data.reduce((points, country) => {
      if (!(country.country === "US" || country.coordinates.latitude === "")) {
        points.push({
          name: country.province
            ? country.province + ", " + country.country
            : country.country,
          cases: country.stats[type],
          confirmed: country.stats["confirmed"],
          deaths: country.stats["deaths"],
          coordinates: [
            parseFloat(country.coordinates.longitude),
            parseFloat(country.coordinates.latitude),
          ],
        });
      } else if (
        type === "recovered" &&
        country.country === "US" &&
        country.province === "Recovered"
      ) {
        points.push({
          name: country.country,
          cases: country.stats[type],
          confirmed: country.stats["confirmed"],
          deaths: country.stats["deaths"],
          coordinates: [-98.5795, 39.8283],
        });
      }
      return points;
    }, []);
  } catch (error) {
    console.log("error");
  }
};

const fetchUSCountyData = async (type) => {
  try {
    const { data } = await axios.get(`${jhu_url}jhucsse/counties`);
    return data.reduce((points, county) => {
      if (county.coordinates.latitude !== "") {
        points.push({
          name: county.county + ", " + county.province + ", " + county.country,
          cases: county.stats[type],
          confirmed: county.stats["confirmed"],
          deaths: county.stats["deaths"],
          coordinates: [
            parseFloat(county.coordinates.longitude),
            parseFloat(county.coordinates.latitude),
          ],
        });
      }
      return points;
    }, []);
  } catch (error) {
    console.log("error");
  }
};

function movingAvg(arr, avgArr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    let avg = 0;
    let j = 0;
    for (let k = 0; k < 14; k++, j++) {
      if (i - j < 0) {
        break;
      }
      avg += arr[i - j];
    }
    avgArr.unshift(avg / j);
  }
}

export const fetchStateData = async (state) => {
  try {
    const { data } = await axios.get(
      `${covid_url}v1/states/${state.toLowerCase()}/daily.json`
    );
    let states = {
      dates: [],
      confirmed: [],
      deaths: [],
      recovered: [],
      hospitalizedCurrently: [],
      positiveIncrease: [],
      deathIncrease: [],
      movingAvgCases: [],
    };
    data.forEach((data, index) => {
      const date = data.date.toString();
      states.dates.unshift(
        date.substring(4, 6) +
          "/" +
          date.substring(6) +
          "/" +
          date.substring(0, 4)
      );
      states.confirmed.unshift(data.positive);
      states.deaths.unshift(data.death);
      states.recovered.unshift(data.recovered ? data.recovered : 0);
      states.hospitalizedCurrently.unshift(data.hospitalizedCurrently);
      states.positiveIncrease.unshift(data.positiveIncrease);
      states.deathIncrease.unshift(data.deathIncrease);
    });
    movingAvg(states.positiveIncrease, states.movingAvgCases);
    return states;
  } catch (error) {
    console.log("error");
  }
};

export const fetchData = async (type) => {
  try {
    let other = await fetchCountryData(type);
    if (type !== "recovered") {
      const us = await fetchUSCountyData(type);
      other = other.concat(us);
    }
    return other;
  } catch (error) {
    console.log("error");
  }
};
