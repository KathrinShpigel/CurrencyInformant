'use strict';

const requestURLCurrency = 'https://www.nbrb.by/api/exrates/rates?periodicity=0';
const requestURLDynamics = 'https://www.nbrb.by/API/ExRates/Rates/Dynamics/';

onmessage = function(event) {
  const request = event.data;
  switch(request.msg) {
    case 'GetInfo':
      postMessage(createResolve('GetInfo', info));
      break;

    case 'GetCurrencies':
      fetch(requestURLCurrency)
        .then(response => response.json())
        .then(data => postMessage(createResolve('GetCurrencies', data)));
      break;

    case 'GetDynamics':
      fetch(createUrlDinamics(request.data))
        .then(response => response.json())
        .then(response => {
            return { 
                data: response.map(el => el.Cur_OfficialRate),
                categories: response.map(el => el.Date)
            }
        })
        .then(data => postMessage(createResolve('GetDynamics', data)));
      break;
  }
}

function createResolve(msg, data) {
    return { msg, data };
}

function createUrlDinamics(data) {
    return requestURLDynamics + `${data.curID}?startDate=${data.startDate}T00:00:00&endDate=${data.endDate}T00:00:00`;
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

const dynamics = [
    {
        "Cur_ID": 170,
        "Date": "2020-08-01T00:00:00",
        "Cur_OfficialRate": 1.7531
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-02T00:00:00",
        "Cur_OfficialRate": 1.7531
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-03T00:00:00",
        "Cur_OfficialRate": 1.7531
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-04T00:00:00",
        "Cur_OfficialRate": 1.7397
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-05T00:00:00",
        "Cur_OfficialRate": 1.7428
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-06T00:00:00",
        "Cur_OfficialRate": 1.7588
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-07T00:00:00",
        "Cur_OfficialRate": 1.7532
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-08T00:00:00",
        "Cur_OfficialRate": 1.7647
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-09T00:00:00",
        "Cur_OfficialRate": 1.7647
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-10T00:00:00",
        "Cur_OfficialRate": 1.7647
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-11T00:00:00",
        "Cur_OfficialRate": 1.7615
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-12T00:00:00",
        "Cur_OfficialRate": 1.7637
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-13T00:00:00",
        "Cur_OfficialRate": 1.7542
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-14T00:00:00",
        "Cur_OfficialRate": 1.7631
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-15T00:00:00",
        "Cur_OfficialRate": 1.7546
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-16T00:00:00",
        "Cur_OfficialRate": 1.7546
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-17T00:00:00",
        "Cur_OfficialRate": 1.7546
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-18T00:00:00",
        "Cur_OfficialRate": 1.7676
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-19T00:00:00",
        "Cur_OfficialRate": 1.7843
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-20T00:00:00",
        "Cur_OfficialRate": 1.7946
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-21T00:00:00",
        "Cur_OfficialRate": 1.7793
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-22T00:00:00",
        "Cur_OfficialRate": 1.8120
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-23T00:00:00",
        "Cur_OfficialRate": 1.8120
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-24T00:00:00",
        "Cur_OfficialRate": 1.8120
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-25T00:00:00",
        "Cur_OfficialRate": 1.8371
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-26T00:00:00",
        "Cur_OfficialRate": 1.8661
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-27T00:00:00",
        "Cur_OfficialRate": 1.9069
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-28T00:00:00",
        "Cur_OfficialRate": 1.9304
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-29T00:00:00",
        "Cur_OfficialRate": 1.9470
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-30T00:00:00",
        "Cur_OfficialRate": 1.9470
    },
    {
        "Cur_ID": 170,
        "Date": "2020-08-31T00:00:00",
        "Cur_OfficialRate": 1.9470
    }
  ];