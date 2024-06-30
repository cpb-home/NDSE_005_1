const readlinePromises = require('node:readline/promises');
const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const cities = [
  {
    title: 'Москва',
    lat: '55',
    lon: '37'
  },
  {
    title: 'Казань',
    lat: '55.4745',
    lon: '49.687'
  },
  {
    title: 'Екатеринбург',
    lat: '56.50',
    lon: '60.35'
  }
];

const accessKey = 'e29606a5-79be-4b29-a9ae-c02ca662c25f';
const headers = {
    'X-Yandex-Weather-Key': accessKey
};


console.log('Укажите город: Москва, Казань или Екатеринбург');
getUserReply();

async function getUserReply() {
  rl.on('line', (line) => {
    const notFoundFlag = true;
    const founded = (cities.find(city => city.title.toLowerCase() === line.toLowerCase()));
    if (founded) {
      fetch(`https://api.weather.yandex.ru/v2/forecast?lat=${founded.lat}&lon=${founded.lon}`, { headers })
      .then(response => response.json())
      .then(json => {
        console.log(`Сейчас в этом городе температура ${json.fact.temp}°С`);
        console.log(`Ощущается, как ${json.fact.feels_like}°С`);
        console.log(`Влажность ${json.fact.humidity}`);
      })
      .then(() => rl.close())
    } else {
      console.log('Города с таким названием не найдено');
      rl.close();
    }
  })
}