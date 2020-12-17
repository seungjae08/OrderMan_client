import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { History } from 'history';
import  Header  from 'components/Header';
import { serverPath } from 'modules/serverPath';
import Button from 'components/Button';
import Loading from 'components/Loading';

type propsTypes = {
  history : History
}

const ModifyPassword = (props:propsTypes) => {
  //useState
  const [isLogin, setIsLogin] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [inputs, setInputs] = useState({
    password:"",
    passwordCheck:"",
    newPassword:""
  });
  const [isLoading, setIsLoading] = useState(false);
  
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
        alert('로그인 정보가 없습니다');
        props.history.push('/login');
      }else if(login.status===203){
        alert('소셜 회원은 비밀번호를 변경할 수 없습니다');
        props.history.push('/mypage');
      }
    }).catch(e=>{
      alert('로그인 정보가 없습니다');
      props.history.push('/login');
    });
  }, [props.history]);

  //function
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");

    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value
    }));
  },[]);

  const postModifyPassword = useCallback(() => {
    const {password, passwordCheck, newPassword} = inputs;
    if( password === "" || passwordCheck === "" || newPassword === "" ){
      setErrorMsg('모든 항목을 입력해주세요');
      return;
    }
    if(newPassword !== passwordCheck){
      setErrorMsg('변경 비밀번호와 비밀번호 확인은 동일해야 합니다.')
      return;
    }
    if(newPassword === password){
      setErrorMsg('변경 비밀번호와 현재 비밀번호가 같습니다. 다시 확인해주세요.')
    }

    setIsLoading(true);
    //POST userinfo
    fetch(serverPath+"/mypage/password",{
      method:"POST",
      mode:"cors",
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        password,
        newPassword
      })
    }).then(res=>{
      setIsLoading(false);
      if(res.status===200){
        alert("비밀번호 수정이 완료됐습니다");
        props.history.push('/mypage');
      }else if(res.status===202){
        setErrorMsg("기존 비밀번호가 맞지 않습니다. 변경할 수 없습니다.")
      }else{
        setErrorMsg("비밀번호 수정을 완료할 수 없습니다. 다시 시도해주세요.")
      }
    }).catch(e=>{
      setIsLoading(false);
      setErrorMsg("비밀번호 수정을 완료할 수 없습니다. 다시 시도해주세요.")
    })
  },[inputs, props.history])

  return (
    <div id="wrap" className="MyPage-wrap">
      <div className="mb-view verCenter">
        <Header isLogin={isLogin} setIsLogin={setIsLogin} history={props.history}/>
        <div className="content_inner">
          <h2>비밀번호 수정</h2>
          <div className="inputWrap">
            <input type="password" onChange={onChange} value={inputs.password} name="password" placeholder="기존 비밀번호"/>
            <input type="password" onChange={onChange} value={inputs.newPassword} name="newPassword" placeholder="변경 비밀번호"/>
            <input type="password" onChange={onChange} value={inputs.passwordCheck} name="passwordCheck" placeholder="비밀번호 확인"/>
          </div>
          {
            errorMsg &&
            <div className="warning_text">{errorMsg}</div>
          }
          <div onClick={postModifyPassword}>
            <Button>비밀번호 수정</Button>
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

export default ModifyPassword;
