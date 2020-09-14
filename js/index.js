'use strict';
const requestURLCurrency = 'https://www.nbrb.by/api/exrates/currencies';
const requestURLDynamics = 'https://www.nbrb.by/API/ExRates/Rates/Dynamics/23?startDate=2020-6-1T00:00:00&endDate=2020-6-30T00:00:00';
const selectCurList = document.querySelector('.select__cur');

function createSelectItem(obj) {
  let option = document.createElement('option');
  option.className = 'form__option';
  option.innerHTML = obj.Cur_Name;
  option.value = obj.Cur_Name;
  selectCurList.append(option);
}

if (window.Worker) {
  const worker = new Worker('../js/worker.js');

  worker.postMessage(requestURLCurrency);

  worker.addEventListener('message', function(event) {
    event.data.forEach(el=>createSelectItem(el));  
  });
}

//Cur_ID
// Cur_Name
// Cur_Abbreviation
// Cur_Scale
// Cur_Periodicity
// Cur_DateStart