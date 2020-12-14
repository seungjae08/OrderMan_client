import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { Header } from 'components/Header';
import { serverPath } from 'modules/serverPath';
import Cert from 'components/Cert';
import Button from 'components/Button';

const ModifyMobile = () => {
  //state
  const [isLogin, setIsLogin] = useState(false);
  const [inputs, setInputs] = useState({
    mobile:""
  });
  const [isSuccessCertMobile, setIsSuccessCertMobile]=useState(false);
  const [errorMsg, setErrorMsg]=useState("");
  
  //useEffect
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
    })
  }, [])

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value
    }));
  },[]);

  const changeSuccessCertMobile = useCallback(()=>{
    setIsSuccessCertMobile(true);
  },[]);

  const postChangeMobile = useCallback(()=>{
    
    //휴대폰 인증 확인
    // if(isSuccessCertMobile === false){
    //   return;
    // }

    let {mobile} = inputs;

    fetch(serverPath + "/mypage/mobile", {
      method: 'POST',
      mode: 'cors', 
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        mobile
      })
    }).then((res)=>{
      if(res.status===200){
        alert('인증 휴대폰 변경이 완료됐습니다');
      }else{
        setErrorMsg('인증 휴대폰 변경이 실패했습니다. 다시 시도해주세요.');
      }
    })
    .catch((e:Error)=>{
      setErrorMsg('인증 휴대폰 변경이 실패했습니다. 다시 시도해주세요.');
    })

  },[inputs]);

  return (
    <div id="wrap" className="MyPage-wrap">
      <div className="mb-view verCenter">
        <Header isLogin={isLogin} setIsLogin={setIsLogin}/>
        <div className="content_inner">
          <h2>인증 휴대폰 변경</h2>
          <div className="inputWrap">
            <Cert mobile={inputs.mobile} onChangeInput={onChange}isSuccessCertMobile={isSuccessCertMobile} changeSuccessCertMobile={changeSuccessCertMobile}/>
          </div>
          {
            errorMsg &&
            <div className="warning_text">{errorMsg}</div>
          }
          <div onClick={postChangeMobile}>
            <Button>휴대폰 변경</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModifyMobile;
