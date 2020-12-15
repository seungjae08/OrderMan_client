import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { History } from 'history';
import { serverPath } from 'modules/serverPath';
import Header from 'components/Header';
import InputBirth from 'components/InputBirth';
import Button from 'components/Button';
import Loading from 'components/Loading';
import { generateBirth } from 'modules/generateDate';

type propsTypes = {
  history : History
}

type InputTypes = {
  yearList: number[];
  monthList: number[];
  dayList: number[];
  year: string;
  month:string;
  day:string;
  address: string;
  brand: string;
}

const ModifyInfo = (props:propsTypes) => {

  //useState
  const [isLogin, setIsLogin] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [inputs, setInputs] = useState<InputTypes>({
    yearList:[],
    monthList:[],
    dayList:[],
    year:"1980",
    month:"1",
    day:"1",
    address:"",
    brand:""
  });
  const [isLoading, setIsLoading] = useState(true);

  //useEffect
  useEffect(() => {
    //로그인 확인
    fetch(serverPath+"/user/login",{
      method:"GET",
      mode:"cors",
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      }
    }).then(login=>{
      if(login.status===200){
        setIsLogin(true);
      }else if(login.status ===202){
        setIsLogin(false);
        alert("로그인 정보가 존재하지 않습니다")
        props.history.push('/login');
      }
    });

    if(isLogin){
      //GET userinfo
      fetch(serverPath+"/mypage/user",{
        method:"GET",
        mode:"cors",
        credentials:"include",
        headers:{
          "Content-Type":"application/json"
        }
      }).then(res=>{
        return res.json();
      }).then(data=>{
        let {brand, address} = data;
        let [year,month,day] = data.birth.split("-");

        setInputs((inputs)=>({
          ...inputs,
          year: year<10? '20'+year: '19' + year,
          month,
          day,
          brand,
          address
        }));
        setIsLoading(false);
      });
    }

    //set year,month,day Lists
    let [yearList, monthList, dayList] = generateBirth();
    setInputs((inputs)=>({
      ...inputs,
      yearList,
      monthList,
      dayList
    }));
  }, [props.history])

  //function
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value
    }));
  },[]);

  const onChangeSelect = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value
    }));
  },[]);

  const postModifyUserInfo = useCallback(() => {
    const {address, brand, year, month, day} = inputs;
    if(address === "" || brand === ""){
      setErrorMsg('항목을 모두 입력해주세요');
      return;
    }
    
    console.log('회원 수정 전송...');
    setIsLoading(true);
    //POST userinfo
    fetch(serverPath+"/mypage/user",{
      method:"POST",
      mode:"cors",
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        address,
        brand,
        birth: `${year.slice(2)}-${Number(month)<10?'0'+month:month}-${Number(day)<10?'0'+day:day}`
      })
    }).then(res=>{
      setIsLoading(false);
      if(res.status===200){
        alert("회원정보 수정이 완료됐습니다");
      }else{
        setErrorMsg("회원정보 수정을 완료할 수 없습니다. 다시 시도해주세요.")
      }
    }).catch(e=>{
      setIsLoading(false);
      setErrorMsg("회원정보 수정을 완료할 수 없습니다. 다시 시도해주세요.")
    })
  },[inputs])

  return (
    <div id="wrap" className="MyPage-wrap">
      <div className="mb-view verCenter">
        <Header isLogin={isLogin} setIsLogin={setIsLogin} history={props.history}/>
        <div className="content_inner">
          <h2>회원 정보 수정</h2>
          <div className="inputWrap">
            <h3>생년월일</h3>
            <InputBirth onChangeSelect={onChangeSelect} yearList={inputs.yearList} monthList={inputs.monthList} dayList={inputs.dayList} year={inputs.year} month={inputs.month} day={inputs.day}/>
            <input type="text" onChange={onChange} value={inputs.address} name="address" placeholder="주소"/>
            <input type="text" onChange={onChange} value={inputs.brand} name="brand" placeholder="상호명"/>
          </div>
          {
            errorMsg &&
            <div className="warning_text">{errorMsg}</div>
          }
          <div onClick={postModifyUserInfo}>
            <Button>회원정보 수정</Button>
          </div>
          {
            isLoading &&
            <Loading/>
          }
        </div>
      </div>
    </div>
  );
}

export default ModifyInfo;
