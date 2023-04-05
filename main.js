let cities = [
  {
    arName: "الرياض",
    enName: "Ar Riyāḑ",
  },
  {
    arName: "القصيم",
    enName: "Al Qaşīm",
  },
  {
    arName: "مكة المكرمة",
    enName: "Makkah al Mukarramah",
  },
  {
    arName: "تبوك",
    enName: "Tabūk",
  },
];

for (let city of cities) {
  const content = `
    <option>${city.arName}</option>
  `;
  document.getElementById("cities-select").innerHTML += content;
}

document
  .getElementById("cities-select")
  .addEventListener("change", function () {
    document.getElementById("city-name").innerHTML = this.value;

    let cityName = "";
    for (let city of cities) {
      if (city.arName == this.value) {
        cityName = city.enName;
      }
    }
    getPrayersTimingsOfCity(cityName);
  });


function getPrayersTimingsOfCity(cityName) {
  let params = {
    country: "SA",
    city: cityName,
  };

  
  axios.get("https://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then(function (response) {
      const timings = response.data.data.timings;
      fillTimeForPrayer("Fajr", timings.Fajr);
      fillTimeForPrayer("Sunrise", timings.Sunrise);
      fillTimeForPrayer("Dhuhr", timings.Dhuhr);
      fillTimeForPrayer("Asr", timings.Asr);
      fillTimeForPrayer("Maghrib", timings.Maghrib);
      fillTimeForPrayer("Isha", timings.Isha);

      const weekday = response.data.data.date.hijri.weekday.ar;
      const day = response.data.data.date.hijri.day;
      const month = response.data.data.date.hijri.month.ar;
      const year = response.data.data.date.hijri.year;
      const date = `${weekday} ${day} ${month} ${year}`;

      document.getElementById("date").innerHTML = date;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function fillTimeForPrayer(id, time) {
  document.getElementById(id).innerHTML = time;
}

let axios;
  axios.get("https://api.aladhan.com/v1/timingsByCity", {
    params: {
      country: "SA",
      city: "Ar Riyāḑ",
    },
  })
  .then(function (response) {
    const timings = response.data.data.timings;
    fillTimeForPrayer("Fajr", timings.Fajr);
    fillTimeForPrayer("Sunrise", timings.Sunrise);
    fillTimeForPrayer("Dhuhr", timings.Dhuhr);
    fillTimeForPrayer("Asr", timings.Asr);
    fillTimeForPrayer("Maghrib", timings.Maghrib);
    fillTimeForPrayer("Isha", timings.Isha);

    const weekday = response.data.data.date.hijri.weekday.ar;
    const day = response.data.data.date.hijri.day;
    const month = response.data.data.date.hijri.month.ar;
    const year = response.data.data.date.hijri.year;
    const date = `${weekday} ${day} ${month} ${year}`;

    document.getElementById("date").innerHTML = date;
  })
  .catch(function (error) {
    console.log(error);
  });
