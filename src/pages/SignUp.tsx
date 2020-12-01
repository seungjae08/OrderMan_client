import React, {useState,useEffect, useCallback, ChangeEvent} from 'react';
import { History } from 'history';
import {serverPath} from 'modules/serverPath';
import axios from 'axios';
import Button from 'components/Button';

type propsTypes = {
  history : History
}

type InputTypes = {
  id: string;
  password: string;
  passwordCheck:string;
  mobile:string;
  address:string;
  brand:string;
  year:string;
  month:string;
  day:string;
  yearList:number[];
  monthList:number[];
  dayList:number[];
}

export default function SignUp(props: propsTypes) {
  const [inputs, setInputs] = useState<InputTypes>({
    id: "",
    password: "",
    passwordCheck:"",
    mobile:"",
    address:"",
    brand:"",
    year:"",
    month:"",
    day:"",
    yearList:[],
    monthList:[],
    dayList:[]
  });

  //error Message
  const [errorMsg, setErrorMsg] = useState('');
  useEffect(() => {
    //mount
    let [yearList, monthList, dayList] = generateBirth();
    setInputs((inputs)=>({
      ...inputs,
      yearList,
      monthList,
      dayList
    }))
  }, []);


  const generateBirth = function(){
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

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value
    }));
  },[])


  const onSubmitSignUp = useCallback(()=>{
    console.log('onSubmitSignUp 회원가입 전송..');

    let {id, password, passwordCheck, mobile, brand, address} = inputs;
    if(password !== passwordCheck){
      setErrorMsg('비밀번호와 비밀번호 확인은 같아야 합니다');
      return;
    }else if(id === "" || password === "" || mobile === "" || brand === "" || address === ""){
      setErrorMsg('모든 항목을 입력해주세요');
      return;
    }

    //POST 요청
    axios.post(serverPath + '/user/signup',{
      id, 
      password, 
      mobile, 
      brand, 
      address
    },{ withCredentials: true }).then(res=>{
      //회원가입 성공
      //회원가입 성공하면, 로그인페이지로 리다이렉트
      props.history.push('/login');
    }).catch(e=>{
      //회원가입 실패
      console.log('회원가입 실패', e)
      if(e.respond && e.respond.status === 204){
        setErrorMsg('이미 존재하는 사용자 입니다');
      }else{
        setErrorMsg('회원가입에 실패했습니다.');
      }
        
    })
  },[inputs, props.history]);

  return (
    <div id="wrap" className="Signup-wrap">
      <div className="mb-view verCenter">
        <h2>회원가입</h2>
        <div className="inputWrap">
          <input type="text" placeholder="아이디" value={inputs.id} name="id" onChange={onChange}/>
          <input type="password" placeholder="비밀번호" value={inputs.password} name="password" onChange={onChange}/>
          <input type="password" placeholder="비밀번호 확인" value={inputs.passwordCheck} name="passwordCheck" onChange={onChange}/>
          <div className="flex">
            <input type="text" placeholder="핸드폰 인증" value={inputs.mobile} name="mobile" onChange={onChange}/>
            {/* <button className="btn st1">인증하기</button> */}
          </div>
          <h3>생년월일</h3>
          <div className="flex birthInput">
            <select defaultValue="1980">
              { inputs.yearList && 
                inputs.yearList.map(year=><option key={year}>{year}</option>)
              }
            </select>
            {/* <input type="text" placeholder="80" value={inputs.year} name="year" onChange={onChange}/> */}
            <span>년</span>
            <select>
              { inputs.monthList && 
                inputs.monthList.map(month=><option key={month}>{month}</option>)
              }
            </select>
            <span>월</span>
            <select>
              { inputs.dayList && 
                inputs.dayList.map(day=><option key={day}>{day}</option>)
              }
            </select>
            <span>일</span>
          </div>
          <input type="text" placeholder="주소" value={inputs.address} name="address" onChange={onChange}/>
          <input type="text" placeholder="상호명" value={inputs.brand} name="brand" onChange={onChange}/>
        </div>
        {
          errorMsg &&
          <div className="warning_text">{errorMsg}</div>
        }
        <div onClick={onSubmitSignUp}>
          <Button>가입하기</Button>
        </div>
      </div>
    </div>
  )
}
