import React from 'react';
import {Link} from 'react-router-dom';
import Button from 'components/Button';

export default function Login() {
  return (
    <div id="wrap" className="Login-wrap">
      <div className="mb-view verCenter">
        <h2>로그인</h2>
        <div className="inputWrap">
          <input type="text" placeholder="아이디"/>
          <input type="password" placeholder="비밀번호"/>
        </div>
        <Button>로그인</Button>
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

