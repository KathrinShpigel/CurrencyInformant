'use strict';

const infoList = document.querySelector('.info__list');
const infoTime = document.querySelectorAll('.info__time');
const selectCurList = document.querySelector('.select__cur');
const selectDateStart = document.querySelector('.select__date-start');
const selectDateEnd = document.querySelector('.select__date-end');
const selectInterval = document.querySelector('.select__interval');
const drawBtn = document.querySelector('.draw__btn');

const currencies = [];

function createInfoItem(obj) {
  const [flag, znak] = (Number(obj.rateToday) >= Number(obj.rateYesterday)) ? ['up', '+'] : ['down', ''];
  const rateChange = ((obj.rateToday*10000 - obj.rateYesterday*10000)/10000).toFixed(4);
  const today = formatDate(getToday(), 'YYYY-MM-DD','DD/MM');
  const yesterday = formatDate(subtractInterval(getToday(), {count: 1, deg: 'day'}), 'YYYY-MM-DD','DD/MM');
  
  if ('content' in document.createElement('template')) {

    const template = document.querySelector('#info-content');
    const infoContent = template.content.querySelector('.info__content');
    const topName =  template.content.querySelector('.top__name');
    const topValue = template.content.querySelector('.top__value');
    const topImg = template.content.querySelector('.top__img');
    const bottomValue = template.content.querySelector('.bottom__value');
    const changeInfo = template.content.querySelector('.change__info');

    infoContent.className = `info__content change__${flag}`;
    topName.title = obj.rateName;
    topName.textContent = obj.rateName;
    topValue.title = today;
    topValue.textContent = obj.rateToday;
    topImg.src = `./images/arrow-${flag}.png`;
    bottomValue.title = yesterday;
    bottomValue.textContent = obj.rateYesterday;
    changeInfo.textContent = `(${znak}${rateChange})`;

    const clone = document.importNode(template.content, true);
    infoList.appendChild(clone);

  } else {
    const div = document.createElement('div');
    div.className = `info__content change__${flag}`;
    div.innerHTML = `
      <div class="content__top">
        <span class="top__name" title="${obj.rateName}">${obj.rateName}</span>
        <span class="top__value" title="${today}">${obj.rateToday}</span> BYN
        <img class="top__img" src="./images/arrow-${flag}.png" alt="changing" style="margin-right: 5px;">
      </div>
      <div class="content__bottom">
        Вчера: <span class="bottom__value" title="${yesterday}">${obj.rateYesterday}</span> BYN
        <span class="change__info">(${znak}${rateChange})</span>
      </div>
    `;
    infoList.append(div);
  }
}

function createSelectCurItem(obj) {
  if ('content' in document.createElement('template')) {

    const template = document.querySelector('#form-option');
    const formOption = template.content.querySelector('.form__option');

    formOption.innerHTML = obj.Cur_Name;
    formOption.value = obj.Cur_ID;

    const clone = document.importNode(template.content, true);
    selectCurList.append(clone);

  } else {
    const option = document.createElement('option');
    option.className = 'form__option';
    option.innerHTML = obj.Cur_Name;
    option.value = obj.Cur_ID;
    selectCurList.append(option);
  }
}

selectDateStart.max = getToday();
selectDateEnd.max = getToday();
infoTime[0].dateTime = getToday();
infoTime[1].dateTime = subtractInterval(getToday(), {count: 1, deg: 'day'});
infoTime[0].textContent = formatDate(getToday(), 'YYYY-MM-DD','DD/MM');
infoTime[1].textContent = formatDate(subtractInterval(getToday(), {count: 1, deg: 'day'}), 'YYYY-MM-DD','DD/MM');


if (window.Worker) {
  const worker = new Worker('../js/worker.js');

  worker.postMessage({ msg:'GetInfo' });
  worker.postMessage({ msg:'GetCurDinAll',
    data: { 
      curName: 'Австралийский доллар',
      curID: 170,
      startDate: subtractInterval(getToday(), {count: 7, deg: 'day'}),
      endDate: getToday(),
    }
  });
  
  worker.onmessage = function(event) {
    const data = event.data;
    const resolve = data.data;
    switch (data.msg) {
      
      case 'GetInfo':
        resolve.forEach(el => createInfoItem(el));
        break;

      case 'GetCurrencies':
        resolve.forEach(el => createSelectCurItem(el));
        drawBtn.disabled = false;
        break;

      case 'GetDynamics':
        buildSchedule(resolve.rate, resolve.data, resolve.categories);
        break;
    }
    
  }  
} else {
	console.log('Your browser doesn\'t support web workers.')
}