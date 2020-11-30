// const yearList: number[] = [];
const monthList: string[] = [];
const dayList: string[] = [];
const hourList: string[] = [];
const minList: string[] = ['00','30'];

/* 받고싶은 배달시간 설정 (default: 현재 시각) */
const today:Date = new Date();
const thisYear:string = String(today.getFullYear());
const thisMonth:string = String(today.getMonth()+1);
const thisDate:string = String(today.getDate());
/* 시각은 현재 시간으로부터 3시간 이후부터 */
const thisHour:string = String(today.getHours());

for (let i = 1; i <= 12; i++) {
  monthList.push(String(i));
}
for (let i = 1; i <= 31; i++) {
  dayList.push(String(i));
}
for (let i = 10; i <= 20; i++) {
  if(i<10){
    hourList.push('0'+String(i));
  }else{
    hourList.push(String(i));
  }
}

export type resultType = [
  string[],
  string[],
  string,
  string,
  string
]

//이번달의 마지막 일자는?
export const calculateLastDay = function(){
  let lastDate:Date = new Date(Number(thisYear), Number(thisMonth), 0);
  return lastDate.getDate();
}

//당일, 익일, 모레 날짜 산출
const calculateDays = function(){
  let [year, month, date] = [Number(thisYear), Number(thisMonth), Number(thisDate)];

  let today = `${year}-${month}-${date < 10 ? '0'+date : date}`;
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
  let nextDay = `${year}-${month}-${date < 10 ? '0'+date : date}`;
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

  let afterTomorrow = `${year}-${month}-${date < 10 ? '0'+date : date}`;
  return [today, nextDay, afterTomorrow];
}

let [toDay, nextDay, afterTomorrow] = calculateDays();

export const validateOrderDate = function(date:string){

  let orderDate = new Date(date);
  let limitDate:Date|string = '';
  //5시 이전일 경우
  if(Number(thisHour)<11){
    //11시이전 주문 일경우
    limitDate = new Date(`${toDay} 13:00`);
  }else if(Number(thisHour)<17){
    //5시이전 주문 일경우
    //내일 오전부터 가능
    limitDate = new Date(`${nextDay} 10:00`);
  }else{
    //6시 이후 주문
    //내일 오후부터 가능
    limitDate = new Date(`${nextDay} 13:00`);
  }

  return limitDate <= orderDate;
}





let result : resultType = [hourList, minList,  toDay, nextDay, afterTomorrow]
export default result;