'use strict';

importScripts('https://unpkg.com/dayjs@1.8.21/dayjs.min.js', '../js/date.js');

const requestURLCurrency = 'https://www.nbrb.by/api/exrates/rates?periodicity=0';
const requestURLDynamics = 'https://www.nbrb.by/API/ExRates/Rates/Dynamics/';

function createResolve(msg, data) {
  return { msg, data };
}

function createUrlDinamics(data) {
  return requestURLDynamics + `${data.curID}?startDate=${data.startDate}T00:00:00&endDate=${data.endDate}T00:00:00`;
}

function getInfo() {
    const startDate = subtractInterval(getToday(), {count: 1, deg: 'day'});
    const endDate = getToday();
    return Promise.all([
      fetch(createUrlDinamics({curID: 145, startDate, endDate})).then(response => response.json()),
      fetch(createUrlDinamics({curID: 292, startDate, endDate})).then(response => response.json()),
      fetch(createUrlDinamics({curID: 298, startDate, endDate})).then(response => response.json()),
      fetch(createUrlDinamics({curID: 290, startDate, endDate})).then(response => response.json()),
    ])
    .then(data => {
      const rates = ["USD", 'EUR', 'RUB', 'UAH'];
      const info = [];
      
      for (let i = 0; i < data.length; i++) {
        info.push({
          rateName: rates[i],
          rateToday: data[i][1].Cur_OfficialRate.toFixed(2),
          rateYesterday: data[i][0].Cur_OfficialRate.toFixed(2),
        });
      }
      return info;
    })
    .then(data => postMessage(createResolve('GetInfo', data)));
}

function getCurrencies(url) {
  return fetch(url)
    .then(response => response.json())
    .then(data => {
        postMessage(createResolve('GetCurrencies', data));
        return data;
    });
}

function getDynamics(request, currencies) {
  return fetch(createUrlDinamics(request.data))
    .then(response => response.json())
    .then(response => {
      return {
        data: response.map(el => el.Cur_OfficialRate),
        categories: response.map(el => formatDate(el.Date, 'YYYY-MM-DD','DD.MM.YYYY')),
        rate: currencies.find(el => el.Cur_ID === 170),
      }
    })
    .then(data => postMessage(createResolve('GetDynamics', data)));
}

onmessage = function(event) {
  const request = event.data;
  switch(request.msg) {
    
    case 'GetInfo':
      getInfo();
      break;

    case 'GetCurDinAll':
      getCurrencies(requestURLCurrency)
        .then(data => {
          getDynamics(request, data);
        });
      break;

    case 'GetDynamics':
      getDynamics(request);
      break;
  }
}

const info = [
    {
      rateName: "USD",
      rateToday: 2.5905,
      rateYesterday: 2.5833,
    },
    {
      rateName: "EUR",
      rateToday: 3.0398,
      rateYesterday: 3.0555,
    },
    {
      rateName: "RUB",
      rateToday: 3.3975,
      rateYesterday: 3.3978,
    },
    {
      rateName: "UAH",
      rateToday: 9.1883,
      rateYesterday: 9.1528,
    },
];