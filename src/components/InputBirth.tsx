import React, {useState, useEffect, useCallback, ChangeEvent} from 'react';

type propTypes = {
  yearList: number[];
  monthList: number[];
  dayList: number[];
  year:string;
  month:string;
  day:string;
  onChangeSelect: (event:ChangeEvent<HTMLSelectElement>)=>void
}

const InputBirth = (props:propTypes) => {

  return (
    <div className="InputBirth-wrap flex">
      <select onChange={props.onChangeSelect} value={props.year} name="year">
        { props.yearList && 
          props.yearList.map(year=><option key={year} value={year}>{year}</option>)
        }
      </select>
      <span>년</span>
      <select onChange={props.onChangeSelect} value={props.month} name="month">
        { props.monthList && 
          props.monthList.map(month=><option key={month} value={month}>{month}</option>)
        }
      </select>
      <span>월</span>
      <select onChange={props.onChangeSelect} value={props.day} name="day">
        { props.dayList && 
          props.dayList.map(day=><option key={day} value={day}>{day}</option>)
        }
      </select>
      <span>일</span>
    </div>
  );
}

export default InputBirth;
