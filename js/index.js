'use strict';

const infoList = document.querySelector('.info__list');
const selectCurList = document.querySelector('.select__cur');
const selectDateStart = document.querySelector('.select__date-start');
const selectDateEnd = document.querySelector('.select__date-end');
const selectInterval = document.querySelector('.select__interval');
const drawBtn = document.querySelector('.draw__btn');

const currencies = [];
const interval = {
  oneDay: [1, 'DD.MM.YYYY'],
  oneWeek: [7, 'DD.MM.YYYY'],
  oneMonth: [1, 'MM.YYYY'],
  oneYear: [1, 'YYYY'],
  fiveYear: [5, 'YYYY'],
}

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

function getSelectOption(currenciesArr) {
  if (window.Worker) {
    worker = new Worker('../js/worker.js');
  
    worker.postMessage('GetCurrencies');
  
    worker.onmessage = function(event) {
      event.data.forEach(el=>currencies.push(el));
      currencies.forEach(el => createSelectCurItem(el));
    }
  }
  drawBtn.disabled = false;
}

function getSchedule(id, dateFrom, dateTo, range) {
  if (window.Worker) {
    worker = new Worker('../js/worker.js');

    worker.postMessage('GetDynamics');
  
    worker.onmessage = function(event) {
      const data = event.data;

      const cur = currencies.find(el => el.Cur_ID === data[0].Cur_ID);

      const date = data.map(el => formatDate(el.Date, "YYYY-MM-DD", range[1]));

      const dataOfficialRate = data.map(el => el.Cur_OfficialRate);
      

      buildSchedule(cur, dataOfficialRate, date);
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

function app() {

  getInfo();
  getSelectOption();

  selectDateStart.max = getToday();
  selectDateEnd.max = getToday();
  
  drawBtn.addEventListener('click', () => {
    const curID = selectCurList.value;
    const dateStart = selectDateStart.value;
    const dateEnd = selectDateEnd.value;
    const range = interval[selectInterval.value];
    getSchedule(curID, dateStart, dateEnd, range);
  });
}

app();

