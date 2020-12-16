import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import {History} from 'history';
import { serverPath } from 'modules/serverPath';
import {actionMainCreators as mainActions, Item } from 'reducers/main';
import {actionOrderCreators as orderActions} from "reducers/order"
import {resetData} from "reducers/order"


type propTypes = {
  history:History,
  noLoginBtn?:boolean;
  itemList ?: Item[];
  hopePrice ?:string
  isLogin : boolean
  changeDatesClickLogout ?: ()=>void
  setIsLogin : (e : boolean)=>void
}

const Header = (props:propTypes) => {
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
        dispatch(resetData());
        alert('로그아웃되었습니다');
        props.setIsLogin(false);
        props.history.push('/');
      }
      if(props.changeDatesClickLogout){
        props.changeDatesClickLogout()
      }
      dispatch(mainActions.endLoading());
    })
    .catch((e)=>{
      console.log(e)
    })
  }
  const onLogin = function(){
    if(props.itemList?.length!==0&& props.hopePrice?.length!==0 ){
      fetch(serverPath+"/order/temp",{
        method: 'POST',
        mode: 'cors', 
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          itemList: props.itemList, 
          hopePrice: props.hopePrice
        })
      })
    }
  }
  const isLoginForm = props.isLogin ?
          (<div onClick={onLogout}>로그아웃</div>):
          (<Link to="/Login" ><div onClick={onLogin}>로그인</div></Link>);
          
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
          props.isLogin?
          ( 
            <>
              <li><Link to="/mypage">마이페이지</Link></li>
              <li><Link to="/orderHistory">구매내역</Link></li>
              <li onClick={onLogout}>로그아웃</li>
            </>
          ): null
        }
      </ul>
    </div>
  )
};

export default Header;