import React from 'react'
import {Link} from 'react-router-dom';
import Button from 'components/Button';

export default function SignUp() {
  return (
    <div id="wrap" className="Login-wrap">
      <div className="mb-view verCenter">
        <h2>회원가입</h2>
        <div className="inputWrap">
          <input type="text" placeholder="아이디"/>
          <input type="password" placeholder="비밀번호"/>
          <div className="flex">
            <input type="text" placeholder="핸드폰 인증"/>
            <button className="btn st1">인증하기</button>
          </div>
          <input type="text" placeholder="주소"/>
          <input type="text" placeholder="상호명"/>
        </div>
        <Link to="/signup" className="Login-submitBtn">
          <Button>가입하기</Button>
        </Link>
      </div>
    </div>
  )
}
