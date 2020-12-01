import React, {useState} from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuOpen = function(){
    if(isMenuOpen){
      setIsMenuOpen(false);
    }else{
      setIsMenuOpen(true);
    }
  }
  return (
    <div className={isMenuOpen? "Header-wrap open" : "Header-wrap"}>
      <div className="Header-menuBar" onClick={toggleMenuOpen}>
        <img src="/assets/menu_bar.png" alt="메뉴바"/>
      </div>
      <h1 className="Header-h1">
        <img src="/assets/header_title.png" alt="오다맨"/>
      </h1>
      <div className="Header-loginbtn">
        <Link to="/Login" >
          로그인
        </Link>
      </div>
      <ul className="Header-menu">
        <li>
          <Link to="/">홈</Link>
        </li>
        {/* <li>마이페이지</li>
        <li>가계부</li> */}
        <li>로그아웃</li>
      </ul>
    </div>
  )
}