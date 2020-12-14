import React, {useState} from 'react';
import {useDispatch} from "react-redux"
import { Link } from 'react-router-dom';
import { serverPath } from 'modules/serverPath';
import {actionMainCreators as mainActions, Item } from 'reducers/main';
import {actionOrderCreators as orderActions} from "../reducers/order"


type propTypes = {
  noLoginBtn?:boolean;
  itemList ?: Item[];
  hopePrice ?:string
  isLogin : boolean
  changeDatesClickLogout ?: ()=>void
  setIsLogin : (e : boolean)=>void
}

export const Header = ({noLoginBtn,itemList,hopePrice, isLogin,changeDatesClickLogout,setIsLogin}:propTypes) => {
  const dispatch= useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuOpen = function(){
    if(isMenuOpen){
      setIsMenuOpen(false);
    }else{
      setIsMenuOpen(true);
    }
  }

  const onLogout = function(){
    dispatch(mainActions.loginUser({}));
    dispatch(orderActions.orderLoginUser([],{mobile:""}));
    fetch(serverPath + '/user/logout', {
      method: 'GET',
      mode: 'cors', 
      credentials: 'include',
      headers: {'Content-Type': 'application/json'}
    }).then((res)=>{
      if(res.status===200){
        alert('로그아웃되었습니다');
        setIsLogin(false);  
      }
      if(changeDatesClickLogout){
        changeDatesClickLogout()
      }
      dispatch(mainActions.endLoading());
    })
    .catch((e)=>{
      console.log(e)
    })
  }
  const onLogin = function(){
    if(itemList?.length!==0&& hopePrice?.length!==0 ){
      fetch(serverPath+"/order/temp",{
        method: 'POST',
        mode: 'cors', 
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({itemList,hopePrice})
      })
    }
  }
  const isLoginForm = isLogin ?
          (<Link to="/"><div onClick={onLogout}>로그아웃</div></Link>):
          (<Link to="/Login" ><div onClick={onLogin}></div>로그인</Link>);
          
  return (
    <div className={isMenuOpen? "Header-wrap open" : "Header-wrap"}>
      <div className="Header-menuBar" onClick={toggleMenuOpen}>
        <img src="/assets/menu_bar.png" alt="메뉴바"/>
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
      <ul className="Header-menu">
        <li>
          <Link to="/">홈</Link>
        </li>
        
        {
          isLogin?
          ( 
            <>
              <li><Link to="/mypage">마이페이지</Link></li>
              <li>가계부</li>
              <li onClick={onLogout}>로그아웃</li>
            </>
          ): null
        }
      </ul>
    </div>
  )
}
