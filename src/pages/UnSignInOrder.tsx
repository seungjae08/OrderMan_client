import React from 'react'
import {Link} from 'react-router-dom';
import Button from 'components/Button';

export default function SignUp() {
  return (
    <div id="wrap" className="UnSignInOrder-wrap">
      <div className="mb-view verCenter">
        <h2>비회원 로그인</h2>
        <h3>휴대폰인증</h3>
        <div className="inputWrap">
          <div className="flex">
            <input type="text" placeholder="핸드폰 인증"/>
            <button className="btn st1">인증하기</button>
          </div>
          <input type="text" placeholder="주소"/>
          <input type="text" placeholder="상호명"/>
        </div>
        <Link to="/order" className="Login-submitBtn">
          <Button>비회원으로 주문하기</Button>
        </Link>
        <div className="warning_text">비회원 주문 시 구매 내역 정보가 저장되지 않습니다</div>

        <div className="BtnList">
          <Link to="/order">
            <Button>로그인</Button>
          </Link>
          <Link to="/order">
            <Button>회원가입</Button>
          </Link>
          <Link to="/order">
            <Button>카카오톡으로 로그인</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
