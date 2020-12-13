import React ,{ useState, useEffect }from 'react';
import { History } from 'history';
import { serverPath } from 'modules/serverPath';
import {Link} from 'react-router-dom';
import {Header} from 'components/Header';
import Button from 'components/Button';
import Loading from 'components/Loading';

type propsTypes = {
  history : History
}

type userInfoTypes = {
  id:string;
  mobile:string;
  birth:string;
  address:string;
  brand:string;
}

export default function MyPage(props:propsTypes) {

  //state
  const [userInfo, setUserInfo] = useState<userInfoTypes>({
    id:"",
    mobile:"",
    birth:"",
    address:"",
    brand:""
  })
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    //로그인 확인
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
        alert("로그인 정보가 존재하지 않습니다")
        props.history.push('/login');
      }
    });


    //GET userinfo
    fetch(serverPath+"/mypage/user",{
      method:"GET",
      mode:"cors",
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      }
    }).then(res=>{
      return res.json();
    }).then(data=>{
      let {brand, address, birth, id, mobile} = data;

      let birthArr = birth.split('-');
      birth = `${Number(birthArr[0])<10?'20'+birthArr[0]:'19'+birthArr[0]}년 ${birthArr[1]}월 ${birthArr[2]}일`;
      setUserInfo((inputs)=>({
        ...inputs,
        id,
        mobile,
        birth,
        brand,
        address
      }));

      setIsLoading(false);
    });

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
          {
            isLoading &&
            <Loading/>
          }
        </div>
      </div>
    </div>
  )
}
