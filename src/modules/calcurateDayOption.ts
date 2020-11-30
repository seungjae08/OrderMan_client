// const yearList: number[] = [];
const monthList: string[] = [];
const dayList: string[] = [];
const hourList: string[] = [];
const minList: string[] = ['00','30'];

/* 받고싶은 배달시간 설정 (default: 현재 시각) */
const today:Date = new Date();
const thisMonth:string = String(today.getMonth()+1);
const thisDay:string = String(today.getDate());
/* 시각은 현재 시간으로부터 3시간 이후부터 */
const thisHour:string = String(today.getHours() + 3);

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
  string[],
  string[],
  string,
  string,
  string
]

let result : resultType = [monthList, dayList, hourList, minList, thisMonth, thisDay, thisHour]
export default result;