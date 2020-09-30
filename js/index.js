'use strict';

const infoList = document.querySelector('.info__list');
const selectCurList = document.querySelector('.select__cur');
const selectDate = document.querySelector('.select__period');
const formBtn = document.querySelector('.form__btn');
let worker;

function createInfoItem(obj) {
  const div = document.createElement('div');
  const [flag, znak] = (obj.rateToday >= obj.rateYesterday) ? ['up', '+'] : ['down', ''];
  const rateChange = ((obj.rateToday*10000 - obj.rateYesterday*10000)/10000).toFixed(4);
  div.className = `info__content change__${flag}`;
  div.innerHTML = `
    <div class="content__top">
      <span class="top__name" title="${obj.rateName}">${obj.rateName}</span>
      <span class="top__value" title="23/09">${obj.rateToday}</span> BYN
      <img class="top__img" src="./images/arrow-${flag}.png" alt="changing" style="margin-right: 5px;">
    </div>
    <div class="content__bottom">
      Вчера: <span class="bottom__value" title="22/09">${obj.rateYesterday}</span> BYN
      <span class="change__info">(${znak}${rateChange})</span>
    </div>
  `;
  infoList.append(div);
}

function createSelectCurItem(obj) {
  const option = document.createElement('option');
  option.className = 'form__option';
  option.innerHTML = obj.Cur_Name;
  option.value = obj.Cur_ID;
  selectCurList.append(option);
}

function getSchedule() {
  if (window.Worker) {
    worker = new Worker('../js/worker.js');

    worker.postMessage('GetDynamics');
  
    worker.onmessage = function(event) {
      console.log(event.data);
    }
  }
}

function getInfo() {
  if (window.Worker) {
    worker = new Worker('../js/worker.js');

    worker.postMessage('GetInfo');
  
    worker.onmessage = function(event) {
      event.data.forEach(el => createInfoItem(el));
    }
  }
}

function getSelectOption(currenciesArr) {
  formBtn.disabled = false;
  return currenciesArr.forEach(el => createSelectCurItem(el));
}

function app() {
  const currencies = [];
  
  if (window.Worker) {
    worker = new Worker('../js/worker.js');
  
    worker.postMessage('GetCurrencies');
  
    worker.onmessage = function(event) {
      event.data.forEach(el=>currencies.push(el));
      getSelectOption(currencies);
    }
  }
}

app();