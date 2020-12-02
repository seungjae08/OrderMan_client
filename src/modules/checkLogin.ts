import { Cookies } from 'react-cookie';

export const isLogin = function(propsCookie:Cookies){
  if(propsCookie.get('accessToken')){
    return true;
  }else{
    return false;
  }
}