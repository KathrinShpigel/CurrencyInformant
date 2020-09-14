'use strict';
const requestURLCurrency = 'https://www.nbrb.by/api/exrates/rates?periodicity=0';
let requestURLDynamics = 'https://www.nbrb.by/API/ExRates/Rates/Dynamics';
const selectCurList = document.querySelector('.select__cur');
const selectDate = document.querySelector('.select__date');
const formBtn = document.querySelector('.form__btn');
const today = moment().format('YYYY-MM-DD');
const period = {
  oneDay:   today,
  fiveDay:  endDay(5, 'days'),
  oneMonth: endDay(1, 'months'),
  oneYear:  endDay(1, 'year'),
  fiveYear: endDay(5, 'year')
};

function endDay(n, measurement) {
  return moment().clone().subtract(n, measurement).format('YYYY-MM-DD');
}

function createSelectCurItem(obj) {
  let option = document.createElement('option');
  option.className = 'form__option';
  option.innerHTML = obj.Cur_Name;
  option.value = obj.Cur_ID;
  selectCurList.append(option);
}

if (window.Worker) {
  const worker = new Worker('../js/worker.js');

  worker.postMessage(requestURLCurrency);

  worker.addEventListener('message', function(event) {
    event.data.forEach(el=>createSelectCurItem(el));

    formBtn.disabled = false;
  });
}

function mappedData(obj) {
  return { Cur_ID: obj.Cur_ID, }
}

formBtn.addEventListener("click", function(e) {
  const urlDynamics = createURLDynamics(selectCurList.value, selectDate.value, requestURLDynamics);
  //getData(urlDynamics);
  console.log(urlDynamics);
});

function createURLDynamics(curID, periodValue, primaryUrl) {
  const endPeriodDay = period[periodValue];
  const url = `${ primaryUrl }/${ curID }?startDate=${ today }T00:00:00&endDate=${ endPeriodDay }T00:00:00`;
  return url;
}