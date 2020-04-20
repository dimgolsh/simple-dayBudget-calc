"use strict";
/* jshint node: true */


let startBtn = document.querySelector("#start"),
  budgetValue = document.querySelector(".budget-value"),
  daybudgetValue = document.querySelector(".daybudget-value"),
  levelValue = document.querySelector(".level-value"),
  expensesValue = document.querySelector(".expenses-value"),
  optionalexpensesValue = document.querySelector(".optionalexpenses-value"),
  incomeValue = document.querySelector(".income-value"),
  monthsavingsValue = document.querySelector(".monthsavings-value"),
  yearsavingsValue = document.querySelector("yearsavings-value");

let expensesInputs = document.querySelectorAll(".expenses-item"),
  optionalexpenses = document.querySelectorAll(".optionalexpenses-item");

let countBudgetBtn = document.querySelector(".count-budget-btn"),
  optionalexpensesBtn = document.querySelector('.optionalexpenses-btn'),
  expensesItemBtn = document.querySelector(".expenses-item-btn"),
  btnAddMore = document.querySelector('.add-more'),
  btnWrapper = document.querySelector('.btn-wrapper');

  countBudgetBtn.disabled = true;
  optionalexpensesBtn.disabled = true;
  expensesItemBtn.disabled = true;

let checkboxSavings = document.querySelector("#savings"),
  chooseIncome = document.querySelector(".choose-income"),
  chooseSum = document.querySelector("#sum"),
  choosePercent = document.querySelector("#percent"),
  yearValue = document.querySelector(".year-value"),
  monthValue = document.querySelector(".month-value"),
  delMore = document.querySelector('.del-more'),
  dayValue = document.querySelector(".day-value");

  let money, time;

  let countInp = expensesInputs.length;



startBtn.addEventListener('click', function() {
  time = prompt("Введите дату в формате YYYY-MM-DD", "");
  money = +prompt("Ваш бюджет на месяц?", "");
  while(isNaN(money) || money == "" || money == null){
    money = +prompt("Ваш бюджет на месяц?", "");
  }
  appData.budget = money;
  appData.timeData = time;
  budgetValue.textContent = money.toFixed();
  yearValue.value = new Date(Date.parse(time)).getFullYear();
  monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
  dayValue.value = new Date(Date.parse(time)).getDate();


  countBudgetBtn.disabled = false;
  optionalexpensesBtn.disabled = false;
  expensesItemBtn.disabled = false;
});

btnAddMore.addEventListener('click',function(){
  let input = document.createElement('input');
      input.type = 'text';
      input.classList.add('expenses-item');
      input.id = `expenses_${++countInp}`;
      input.placeholder = "Наименование";

      let inputPrice = document.createElement('input');
      inputPrice.type = 'text';
      inputPrice.classList.add('expenses-item');
      inputPrice.id = `expenses_${++countInp}`;
      inputPrice.placeholder = "Цена";

      btnWrapper.appendChild(input);
      btnWrapper.appendChild(inputPrice);

      expensesInputs = document.querySelectorAll(".expenses-item");

      console.log(input);
      console.log(inputPrice);
});

delMore.addEventListener('click',function(){

  if(expensesInputs.length > 2){
    
    
      expensesInputs[expensesInputs.length - 1].remove();
      expensesInputs[expensesInputs.length - 2].remove();

      expensesInputs = document.querySelectorAll(".expenses-item");
  }
});

expensesItemBtn.addEventListener('click', function(){
  let sum = 0;

  for (let i = 0; i < expensesInputs.length; i++) {
    let a = expensesInputs[i].value,
        b = expensesInputs[++i].value;
    if (
      typeof a === "string" &&
      typeof a != null &&
      typeof b != null &&
      a != "" &&
      b != "" &&
      a.length < 50
    ) {
      console.log("done");
      appData.expenses[a] = b;
      sum += +b;

    } else {
      i = i - 1;
    }
  }
  expensesValue.textContent = sum;
});

optionalexpensesBtn.addEventListener('click', function(){
  for (let i = 0; i < optionalexpenses.length; i++){
    let check = optionalexpenses[i].value;
    appData.optionalExpenses[i] = check;
    optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';
  }
});


countBudgetBtn.addEventListener('click',function(){

  if(appData.budget != undefined){

    appData.moneyPerDay = (appData.budget / 30).toFixed();
    daybudgetValue.textContent  = (appData.moneyPerDay - ( +expensesValue.textContent/30)).toFixed();
    if (appData.moneyPerDay < 100) {
      levelValue.textContent = "Минимальный уровень достатка";
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
      levelValue.textContent ="Средний уровень достатка";
    } else if (appData.moneyPerDay > 2000) {
      levelValue.textContent = "Высокий уровень";
    } else {
      levelValue.textContent = "Произошла ошибка";
    }
  } else {
    daybudgetValue.textContent = "Произошла ошибка";
  }

});

chooseIncome.addEventListener('input',function(){

  let items = chooseIncome.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
  
});

checkboxSavings.addEventListener('click',function(){
  if(appData.savings == true){
    appData.savings = false;
  }else {
    appData.savings = true;
  }
});

chooseSum.addEventListener('input',function(){
  if (appData.savings == true){
    let sum = +chooseSum.value,
        percent = +choosePercent.value;

    appData.monthIcome = sum/100/12*percent;
    appData.yearIncome = sum/100*percent;
    monthsavingsValue.textContent = appData.monthIcome.toFixed(1);
    yearsavingsValue.textContent = appData.yearIncome.toFixed(1);

  }
});

choosePercent.addEventListener('input',function(){
  if (appData.savings == true){

     let sum = +chooseSum.value,
        percent = +choosePercent.value;

    appData.monthIcome = sum/100/12*percent;
    appData.yearIncome = sum/100*percent;
    monthsavingsValue.textContent = appData.monthIcome.toFixed(1);
    yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
  }
});

let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false,

};

