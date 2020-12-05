import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { serverPath } from 'modules/serverPath';

type propTypes = {
  noLoginBtn?:boolean;
  isLogin : boolean,
  setIsLogin : (e : boolean)=>void
}

export const Header = ({noLoginBtn,isLogin,setIsLogin}:propTypes) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuOpen = function(){
    if(isMenuOpen){
      setIsMenuOpen(false);
    }else{
      setIsMenuOpen(true);
    }
  }
  const onLogout = function(){

    fetch(serverPath + '/user/logout', {
      method: 'GET',
      mode: 'cors', 
      credentials: 'include',
      headers: {'Content-Type': 'application/json'}
    }).then((res)=>{
      console.log(res);
      if(res.status===200){
        alert('로그아웃되었습니다');
        setIsLogin(false);  
      }
    })
    .catch((e)=>{
      console.log(e)
    })
  }
  const isLoginForm = isLogin ?
          (<div onClick={onLogout}>로그아웃</div>):
          (<Link to="/Login" >로그인</Link>);
          
  return (
    <div className={isMenuOpen? "Header-wrap open" : "Header-wrap"}>
      <div className="Header-menuBar" onClick={toggleMenuOpen}>
        {/* <img src="/assets/menu_bar.png" alt="메뉴바"/> */}
      </div>
      <h1 className="Header-h1">
        <Link to="/">
          <img src="/assets/header_title.png" alt="오다맨" />
        </Link>
      </h1>
      <div className="Header-loginbtn">
        {
          isLoginForm
        }
      </div>
      {/* <ul className="Header-menu">
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>마이페이지</li>
        <li>가계부</li>
        {
          loginStatus?
          (
            <li onClick={onLogout}>로그아웃</li>
          ): null
        }
      </ul> */}
    </div>
  )
}
