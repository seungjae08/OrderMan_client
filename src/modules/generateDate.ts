export const generateBirth = function(){
    let yearList = [];
    let monthList = [];
    let dayList = [];
    for(let i=1940; i<2002; i++){
      yearList.push(i);
    }
    for(let i=1; i<=12; i++){
      monthList.push(i);
    }
    for(let i=1; i<=31; i++){
      dayList.push(i);
    }
    return [yearList, monthList, dayList];
  }