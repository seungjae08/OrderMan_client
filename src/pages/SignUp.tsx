import React, {useState,useEffect, useCallback, ChangeEvent} from 'react';
import { History } from 'history';
import Button from 'components/Button';
import InputBirth from 'components/InputBirth';
import Cert from 'components/Cert';
import { serverPath } from 'modules/serverPath';
import  Header from 'components/Header';
import Loading from 'components/Loading';
import { generateBirth } from 'modules/generateDate';

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
  yearList: number[];
  monthList: number[];
  dayList: number[];
  year: string;
  month:string;
  day:string;
}

export default function SignUp(props: propsTypes) {

  //useState
  const [inputs, setInputs] = useState<InputTypes>({
    id: "",
    password: "",
    passwordCheck:"",
    mobile:"",
    address:"",
    brand:"",
    yearList:[],
    monthList:[],
    dayList:[],
    year:"1980",
    month:"1",
    day:"1"
  });
  const [isLogin,setIsLogin] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccessCertMobile, setIsSuccessCertMobile]=useState(false);
  const [isLoading, setIsLoading]=useState(false);

  //useEffect
  useEffect(() => {
    //로그인여부 반환
    fetch( serverPath + "/user/login",{
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
    }).catch(err=>{
      console.log(err);
    });
    //mount
    let [yearList, monthList, dayList] = generateBirth();
    setInputs((inputs)=>({
      ...inputs,
      yearList,
      monthList,
      dayList
    }))
  }, []);

  //function
  const onChangeSelect = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value
    }));
  },[]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value
    }));
  },[])
  
  const onSubmitSignUp = useCallback(()=>{
    console.log('onSubmitSignUp 회원가입 전송..');
    let {id, password, passwordCheck, mobile, brand, address, year, month, day} = inputs;
    if(password !== passwordCheck){
      setErrorMsg('비밀번호와 비밀번호 확인은 같아야 합니다');
      return;
    }else if(id === "" || password === "" || mobile === "" || brand === "" || address === ""){
      setErrorMsg('모든 항목을 입력해주세요');
      return;
    }

    // if(isSuccessCertMobile!==true){
    //   setErrorMsg('핸드폰 인증을 완료해주세요');
    //   return;
    // }

    setIsLoading(true);

    fetch(serverPath + "/user/signup", {
      method: 'POST',
      mode: 'cors', 
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId:id, 
        password, 
        mobile, 
        brand, 
        address,
        birth:`${year.slice(2)}-${Number(month)<10?'0'+month:month}-${Number(day)<10?'0'+day:day}`
      })
    }).then((res)=>{
      setIsLoading(false);
      if(res.status===200){
        alert('회원가입이 완료되었습니다');
        props.history.push('/login');
      }else if(res.status===204){
        setErrorMsg('이미 존재하는 사용자 입니다');
      }
    })
    .catch((e:Error)=>{
      setIsLoading(false);
    })
  },[inputs, props.history]);

  const changeSuccessCertMobile = useCallback(()=>{
    setIsSuccessCertMobile(true);
  },[])

  return (
    <div id="wrap" className="Signup-wrap">
      <div className="mb-view verCenter">
        <Header isLogin={isLogin} setIsLogin={setIsLogin} history={props.history}/>
        <div className="content_inner">
          <h2>회원가입</h2>
          <div className="inputWrap">
            <input type="text" placeholder="아이디" value={inputs.id} name="id" onChange={onChange}/>
            <input type="password" placeholder="비밀번호" value={inputs.password} name="password" onChange={onChange}/>
            <input type="password" placeholder="비밀번호 확인" value={inputs.passwordCheck} name="passwordCheck" onChange={onChange}/>
            <h3>휴대폰 인증</h3>
            <Cert mobile={inputs.mobile} onChangeInput={onChange}isSuccessCertMobile={isSuccessCertMobile} changeSuccessCertMobile={changeSuccessCertMobile}/>
            <h3>생년월일</h3>
            <InputBirth onChangeSelect={onChangeSelect} yearList={inputs.yearList} monthList={inputs.monthList} dayList={inputs.dayList} year={inputs.year} month={inputs.month} day={inputs.day}/>
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
          {
            isLoading &&
            <Loading/>
          }
        </div>
      </div>
    </div>
  )
}
