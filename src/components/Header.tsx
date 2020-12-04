import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { serverPath } from 'modules/serverPath';

type propTypes = {
  noLoginBtn?:boolean;
}

export const Header = (props:propTypes) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    //로그인확인 
    fetch( serverPath + "/user/login", {
      method: 'GET', 
      mode: 'cors', 
      credentials: 'include', 
      headers: {
          'Content-Type': 'application/json',
      }
    }).then(res=>{
      if(res.status === 200){
        //회원
        setIsLogin(true);
      }else{
        setIsLogin(false);
      }
    });
  },[])

  const toggleMenuOpen = function(){
    if(isMenuOpen){
      setIsMenuOpen(false);
    }else{
      setIsMenuOpen(true);
    }
  }
  const onLogout = function(){
    console.log(serverPath + '/user/logout');
    fetch(serverPath + '/user/logout', {
      method: 'GET',
      mode: 'cors', 
      credentials: 'include',
      headers: {'Content-Type': 'application/json'}
    }).then(async (res)=>{
      let data = await res.json();
      console.log(data);
    })
    .catch((e:Error)=>{
      console.log(e)
    })
  }
  const isLoginForm = isLogin ?
          (<div onClick={onLogout}>로그아웃</div>):
          (<Link to="/Login" >로그인</Link>);
          
  return (
    <div className={isMenuOpen? "Header-wrap open" : "Header-wrap"}>
      <div className="Header-menuBar" onClick={toggleMenuOpen}>
        <img src="/assets/menu_bar.png" alt="메뉴바"/>
      </div>
      <h1 className="Header-h1">
          <img src="/assets/header_title.png" alt="오다맨"/>

      </h1>
      <div className="Header-loginbtn">
        {
          props.noLoginBtn ? 
          null:
          isLoginForm
        }
      </div>
      <ul className="Header-menu">
        <li>
          <Link to="/">홈</Link>
        </li>
        {/* <li>마이페이지</li>
        <li>가계부</li> */}
        {/* {
          loginStatus?
          (
            <li onClick={onLogout}>로그아웃</li>
          ): null
        } */}
      </ul>
    </div>
  )
}
