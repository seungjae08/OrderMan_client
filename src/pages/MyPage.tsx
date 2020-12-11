import React ,{ useState, useEffect }from 'react';
import {Link} from 'react-router-dom';
import {Header} from 'components/Header';
import Button from 'components/Button';

type userInfoTypes = {
  id:string;
  mobile:string;
  birth:string;
  address:string;
  brand:string;}

export default function MyPage() {

  //state
  const [userInfo, setUserInfo] = useState<userInfoTypes>({
    id:"",
    mobile:"",
    birth:"",
    address:"",
    brand:""
  })
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    //데이터 받으면 삭제할 부분
    setUserInfo({
      id:"user123",
      mobile:"010-4567-8080",
      birth:"1980-01-01",
      address:"서울특별시 종로구 종각로 123-123",
      brand:"야채가게"
    })
  }, [])

  return (
    <div id="wrap" className="MyPage-wrap">
      <div className="mb-view verCenter">
        <Header isLogin={isLogin} setIsLogin={setIsLogin}/>
        <div className="content_inner">
          <h2>마이페이지</h2>
          <ul className="MyPage-userInfo">
            <li>
              <h3>아이디</h3>
              <p>{userInfo.id}</p>
            </li>
            <li>
              <h3>비밀번호</h3>
              <p>***</p>
            </li>
            <li>
              <h3>생년월일</h3>
              <p>{userInfo.birth}</p>
            </li>
            <li>
              <h3>주소</h3>
              <p>{userInfo.address}</p>
            </li>
            <li>
              <h3>상호명</h3>
              <p>{userInfo.brand}</p>
            </li>
          </ul>
          <Link to="/modify/info" className="fullBtn">
            <Button color="#F87946" bgColor="white" borderColor="#D6D6D6">
              <div>
                회원정보 수정
                <img src="/assets/button_arrow.png" alt="이동"/>
              </div>
            </Button>
          </Link>
          <Link to="/modify/password" className="fullBtn">
            <Button color="#F87946" bgColor="white" borderColor="#D6D6D6">
              <div>
                비밀번호 수정
                <img src="/assets/button_arrow.png" alt="이동"/>
              </div>
            </Button>
          </Link>
          <Link to="/modify/mobile" className="fullBtn">
            <Button color="#F87946" bgColor="white" borderColor="#D6D6D6">
              <div>
                인증 휴대폰 변경
                <img src="/assets/button_arrow.png" alt="이동"/>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
