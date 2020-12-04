import React, {useState, useEffect, useCallback, ChangeEvent} from 'react';
import { History } from 'history';
import {Link} from 'react-router-dom';
import Button from 'components/Button';
import { serverPath } from 'modules/serverPath';
import { Header } from 'components/Header';

type propsTypes = {
  history : History
}
// declare global {
//   interface Window {
//     Kakao: any;
//   }
// }
// window.Kakao = window.Kakao || "SomeValue";
// const {Kakao} = window;

function Login(props : propsTypes) {
  
  const [inputs, setInputs] = useState({
    id: '',
    password: ''
  });

  //error Message
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // console.log(isLogin(props.cookies));
    // if(isLogin(props.cookies)){
    //   props.history.push('/');
    // }
  }, [])

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value
    }));
  },[])

  const onSubmitLogin = useCallback(()=>{
    
    console.log('onSubmitLogin 전송..')
    if(inputs.id === "" || inputs.password === ""){
      return;
    }

    fetch(serverPath + "/user/login", {
      method: 'POST',
      mode: 'cors', 
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: inputs.id,
        password: inputs.password
      })
    }).then((res)=>{
      if(res.status===200){
        props.history.push('/');
      }else if(res.status===204){
        setErrorMsg('등록되지 않은 아이디이거나 비밀번호가 맞지 않습니다');
      }
    })
    .catch((e:Error)=>{
      setErrorMsg('로그인에 실패했습니다');
    })
  
  },[inputs, props.history]);

  // const onKakaoLoginHandler = function(){
  //   Kakao.Auth.authorize({
  //     redirectUri: clientPath+'/signup/social'
  //   });
  // }

  return (
    <div id="wrap" className="Login-wrap">
      <div className="mb-view verCenter">
        <Header/>
        <h2>로그인</h2>
        <div className="inputWrap">
          <input type="text" placeholder="아이디" value={inputs.id} onChange={onChange} name="id"/>
          <input type="password" placeholder="비밀번호" value={inputs.password} onChange={onChange} name="password"/>
        </div>
        {
          errorMsg && 
          <div className="warning_text">{errorMsg}</div>
        }
        <div onClick={onSubmitLogin}>
          <Button>로그인</Button>
        </div> 
        {/* <div className="socialBtnList">
          <div onClick={onKakaoLoginHandler}>
            <Button color="#3B1D1D" bgColor="#FFEB00">카카오톡으로 로그인</Button>
          </div>
        </div> */}
        <Link to="/signup">
          <Button>회원가입</Button>
        </Link>
        
      </div>
    </div>
  )
}

export default Login;