import React, {useState, useCallback, ChangeEvent} from 'react'
import {Link} from 'react-router-dom';
import Button from 'components/Button';
import {serverPath} from 'modules/serverPath';
import axios from 'axios';

export default function Login() {
  const [inputs, setInputs] = useState({
    id: '',
    password: ''
  });

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value
    }));
  },[])

  const onSubmitLogin = useCallback(()=>{
    axios.post(serverPath + '/user/login',{
      id:inputs.id,
      password:inputs.password
    },{ withCredentials: true }).then(res=>{

    })
  },[inputs.id,inputs.password]);

  return (
    <div id="wrap" className="Login-wrap">
      <div className="mb-view verCenter">
        <h2>로그인</h2>
        <div className="inputWrap">
          <input type="text" placeholder="아이디" value={inputs.id} onChange={onChange} name="id"/>
          <input type="password" placeholder="비밀번호" value={inputs.password} onChange={onChange} name="password"/>
        </div>
        <div onSubmit={onSubmitLogin}>
          <Button>로그인</Button>
        </div> 
        <div className="socialBtnList">
          <Link to="/signup/social/">
            <Button color="#3B1D1D" bgColor="#FFEB00">카카오톡으로 로그인</Button>
          </Link>
        </div>

        <Link to="/signup">
          <Button>회원가입</Button>
        </Link>
        
      </div>
    </div>
  )
}

