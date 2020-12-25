import React, {useState, useEffect, useCallback, ChangeEvent} from 'react';
import { History } from 'history';
import {Link} from 'react-router-dom';
import Button from 'components/Button';
import { serverPath, clientPath } from 'modules/serverPath';
import Header from 'components/Header';
import Loading from 'components/Loading';

type propsTypes = {
  history : History
}
declare global {
  interface Window {
    Kakao: any;
  }
}
window.Kakao = window.Kakao || "SomeValue";
const {Kakao} = window;

function Login(props : propsTypes) {

  //useState
  const [isLogin,setIsLogin] = useState(false)
  const [inputs, setInputs] = useState({
    id: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
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
      }
    })
  }, [])


  //function
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
    setIsLoading(true);

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
      setIsLoading(false);
      if(res.status===200){
        props.history.push('/');
      }else if(res.status===204){
        setErrorMsg('등록되지 않은 아이디이거나 비밀번호가 맞지 않습니다');
      }
    })
    .catch((e:Error)=>{
      setIsLoading(false);
      setErrorMsg('로그인에 실패했습니다');
    })
  
  },[inputs, props.history]);

  const onKakaoLoginHandler = function(){
    Kakao.Auth.authorize({
      redirectUri: clientPath+'/signup/social'
    });
  }

  return (
    <div id="wrap" className="Login-wrap">
      <div className="mb-view verCenter">
        <Header isLogin={isLogin} setIsLogin={setIsLogin} history={props.history}/>
        <div className="content_inner">
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
          <div className="socialBtnList">
            <div onClick={onKakaoLoginHandler}>
              <Button color="black" bgColor="#FEE500">
                <img src="/assets/ico_kakao.png" alt="카카오 로그인"/>
              </Button>
            </div>
          </div>
          <Link to="/signup" className="fullBtn">
            <Button color="#F87946" bgColor="white" borderColor="#D6D6D6">
              <div>
                회원가입
                <img src="/assets/button_arrow.png" alt="이동"/>
              </div>
            </Button>
          </Link>

          {
            isLoading &&
            <Loading/>
          }
        </div>
      </div>
    </div>
  )
}

export default Login;