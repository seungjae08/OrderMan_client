import React, {useState, useCallback, useEffect, ChangeEvent} from 'react';
import { History, Location } from 'history';
import Button from 'components/Button';
import Cert from 'components/Cert';
import InputBirth from 'components/InputBirth';
import { Header } from 'components/Header';
import {serverPath, clientPath} from 'modules/serverPath';
import {KAKAO_REST_API_KEY} from 'modules/config';
import { generateBirth } from 'modules/generateDate';
import Loading from 'components/Loading';

type propsTypes = {
  history : History;
  location: Location;
}

type InputTypes = {
  mobile:string;
  address:string;
  brand:string;
  yearList: number[];
  monthList: number[];
  dayList: number[];
  year: string;
  month:string;
  day:string;
}


export default function SignUpSocial(props: propsTypes) {
  
  window.Kakao = window.Kakao || "SomeValue";
  const {Kakao} = window;
  const code = props.location.search.split("=")[1];
  let bearer:string = '';

  //useState
  const [isLogin,setIsLogin] = useState(false)
  const [inputs, setInputs] = useState<InputTypes>({
    address:"",
    brand:"",
    mobile:"",
    yearList:[],
    monthList:[],
    dayList:[],
    year:"1980",
    month:"1",
    day:"1"
  });
  const [isRender, setIsRender] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccessCertMobile, setIsSuccessCertMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //useEffect
  //mount, check login
  useEffect(() => {
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
      }
    });

    fetch('https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id='+KAKAO_REST_API_KEY+'&redirect_uri='+clientPath+'/signup/social&code='+code, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
    }).then(res=>{
      return res.json();
    }).then(data=>{
      console.log(data);
      bearer = 'Bearer ' + data.access_token;
      fetch(serverPath+'/user/oauthup', {
        method: 'GET',
        mode: 'cors', 
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': bearer,
        }
      }).then(res=>{
        //기존 이용자라면 (상태코드 200)
        //사이트의토큰을 받고, 메인으로 처리
        //props.history.push('/');

        //처음소셜로그인이용자//기존 이용자라면 (상태코드 202)
        //가입화면 render
      }).catch(error=>{
        console.log(error);
        props.history.push('')
      })
    }).catch(e=>{
      alert('카카오 로그인이 정상 작동하지 않습니다');
    });

    let [yearList, monthList, dayList] = generateBirth();
    setInputs((inputs)=>({
      ...inputs,
      yearList,
      monthList,
      dayList
    }))
  }, [])

  //function
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value
    }));
  },[]);

  const onSubmitSignUpSocial = useCallback(()=>{
    console.log('onSubmitSignUpSocial 소셜 회원가입 전송..');

    if(!code){
      console.log('not code');
      return;
    }
    let {address, brand, mobile} = inputs;
    if(brand === "" || address === "" || isSuccessCertMobile === false){
      setErrorMsg('모든 항목을 입력해주세요');
      return;
    }

    setIsLoading(true);
    fetch(serverPath+'/user/oauthup', {
      method: 'POST',
      mode: 'cors', 
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        address, 
        brand, 
        mobile
      })
    }).then(res=>{
      setIsLoading(false);
      //기존 이용자라면 (상태코드 200)
      //사이트의토큰을 받고, 메인으로 처리
      //props.history.push('/');

      //처음소셜로그인이용자//기존 이용자라면 (상태코드 202)
      //가입화면 render
    }).catch(error=>{
      setIsLoading(false);
      console.log(error);
    })
  },[inputs, code, isSuccessCertMobile]);

  const onChangeSelect = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value
    }));
  },[]);

  const changeSuccessCertMobile = useCallback(()=>{
    setIsSuccessCertMobile(true);
  },[])

  if(isRender){
    return (
      <div id="wrap">
        <div className="mb-view verCenter">
          <Header isLogin={isLogin} setIsLogin={setIsLogin}/>
          <div className="content_inner">
            <h2>회원가입(카카오톡)</h2>
            <div className="inputWrap">
              <h3>휴대폰 인증</h3>
              <Cert mobile={inputs.mobile} onChangeInput={onChange}isSuccessCertMobile={isSuccessCertMobile} changeSuccessCertMobile={changeSuccessCertMobile}/>
              <h3>생년월일</h3>
              <InputBirth onChangeSelect={onChangeSelect} yearList={inputs.yearList} monthList={inputs.monthList} dayList={inputs.dayList} year={inputs.year} month={inputs.month} day={inputs.day}/>
              <input type="text" placeholder="주소" value={inputs.address} name="address" onChange={onChange}/>
              <input type="text" placeholder="상호명" value={inputs.brand} name="brand" onChange={onChange}/>
            </div>
            {/* {
              errorMsg  &&
              <div className="warning_text">{errorMsg}</div>
            } */}
            <div onClick={onSubmitSignUpSocial}>
              <Button>가입하기</Button>
            </div>
            {
              isLoading &&
              <Loading/>
            }
          </div>
        </div>
      </div>
      )
  }else{
    return (
      <div id="wrap">
        <div className="mb-view verCenter">
          <Header isLogin={isLogin} setIsLogin={setIsLogin}/>
          <div className="content_inner">
          </div>
        </div>
      </div>
    )
  }
  
}
