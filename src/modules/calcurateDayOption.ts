

//check now date, time
// set thisYear, thisMonth, thisDate
const checkThisTime = function(){
  const today:Date = new Date();
  const thisYear:string = String(today.getFullYear());
  const thisMonth:string = String(today.getMonth()+1);
  const thisDate:string = String(today.getDate());
  return [thisYear, thisMonth, thisDate];
}
// set thisHour
export const checkThisHour = function(){
  const today:Date = new Date();
  const thisHour:string = String(today.getHours());
  return thisHour;
}
const [thisYear, thisMonth, thisDate] = checkThisTime();
const thisHour = checkThisHour();



//set monthList
const monthList: string[] = [];
for (let i = 1; i <= 12; i++) {
  monthList.push(String(i));
}
//set minList
const minList: string[] = ['00','30'];
//set dayList, hourList in initialize
export const createList = function(){
  const thisHour = checkThisHour();
  let dayList:string[] = [];
  let hourList:string[] = [];
  if(Number(thisHour)<11){
    dayList = ['당일','익일','모레'];
    for (let i = 13; i <= 20; i++) {
      hourList.push(String(i));
    }
  }else if(Number(thisHour)<17){
    dayList = ['익일','모레'];
    for (let i = 10; i <= 20; i++) {
      hourList.push(String(i));
    }
  }else{
    dayList = ['익일','모레'];
    for (let i = 13; i <= 20; i++) {
      hourList.push(String(i));
    }
  }
  return [dayList, hourList];
}
let [dayList, hourList] = createList();


//set lastDate which use in calcualteDays
export const calculateLastDay = function(){
  let lastDate:Date = new Date(Number(thisYear), Number(thisMonth), 0);
  return lastDate.getDate();
}
//set today, nextDay, afterTomorrow
const calculateDays = function(){
  let [year, month, date] = [Number(thisYear), Number(thisMonth), Number(thisDate)];
  let today = `${year}-${month}-${date}`;
  let lastDay = calculateLastDay();
  if(lastDay >= date + 1){
    date++;
  }else{
    if(month+1 <=12){
      month++;
      date=1;
    }else{
      year++;
      month=1;
      date=1;
    }
  }
  let nextDay = `${year}-${month}-${date}`;
  if(lastDay >= date + 1){
    date++;
  }else{
    if(month+1 <=12){
      month++;
      date=1;
    }else{
      year++;
      month=1;
      date=1;
    }
  }
  let afterTomorrow = `${year}-${month}-${date}`;
  return [today, nextDay, afterTomorrow];
}
let [toDay, nextDay, afterTomorrow] = calculateDays();

//valideate order date. 
export const validateOrderDate = function(date:string){
  let orderDate = new Date(date);
  let limitDate:Date|string = '';
  if(Number(thisHour)<11){
    limitDate = new Date(`${toDay} 13:00`);
  }else if(Number(thisHour)<17){
    limitDate = new Date(`${nextDay} 10:00`);
  }else{
    limitDate = new Date(`${nextDay} 13:00`);
  }
  return limitDate <= orderDate;
}

// re-render hourList, when change dayList in event handling.
export const renderHour = function(date:string){
  const thisHour = checkThisHour();
  let hours = [];
  let range:number[] = [];
  if(Number(thisHour)<11){
    if(date==="당일" || date === toDay){
      range = [13,20];  
    }else{
      range = [10,20];
    }
  }else if(Number(thisHour)<17){
    range = [10,20];
  }else{
    if(date==="익일" || date === nextDay){
      range = [13,20];
    }else{
      range = [10,20];
    }
  }
  for(let i=range[0]; i<=range[1]; i++){
    hours.push(String(i));
  }
  return hours;
}

export type resultType = [
  string[], // dayList = ['당일','익일','모레'];
  string[], // hourList = ['10','11','12','13','14','15','16','17','18','19','20']
  string[], //minList = ['00','30']
  string, //toDay = '2020-12-9'
  string, //nextDay = '2020-12-10'
  string //afterTomorrow = '2020-12-11'
]

let result : resultType = [dayList, hourList, minList, toDay, nextDay, afterTomorrow]
export default result;