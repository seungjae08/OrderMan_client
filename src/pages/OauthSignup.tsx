import React, {useState, useCallback, ChangeEvent} from 'react';
import { History } from 'history';
import {serverPath} from 'modules/serverPath';
import axios from 'axios';
import Button from 'components/Button';

type propsTypes = {
  history : History
}

export default function SignUpSocial(props: propsTypes) {
  const [inputs, setInputs] = useState({
    address:"",
    brand:""
  });

  const [errorMsg, setErrorMsg] = useState('');

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value
    }));
  },[]);

  const onSubmitSignUpSocial = useCallback(()=>{
    console.log('onSubmitSignUpSocial 소셜 회원가입 전송..');

    let {brand, address} = inputs;
    if(brand === "" || address === ""){
      setErrorMsg('모든 항목을 입력해주세요');
      return;
    }

    //POST 요청
    axios.post(serverPath + '/user/signup/social',{
      brand, 
      address
    },{ withCredentials: true }).then(res=>{
      //소셜 회원가입 성공
      //회원가입 성공하면, 로그인페이지로 리다이렉트
      props.history.push('/login');
    }).catch(e=>{
      //회원가입 실패
      console.log('회원가입 실패', e)

      //소셜 사용자 회원가입 반환값에 따른, 처리

      // if(e.respond && e.respond.status === 204){
      //   setErrorMsg('이미 존재하는 사용자 입니다');
      // }else{
      //   setErrorMsg('회원가입에 실패했습니다.');
      // }
        
    })
  },[inputs, props.history]);

  return (
    <div id="wrap">
      <div className="mb-view verCenter">
        <h2>회원가입(카카오톡)</h2>
        <div className="inputWrap">
          <input type="text" placeholder="주소" value={inputs.address} name="address" onChange={onChange}/>
          <input type="text" placeholder="상호명" value={inputs.brand} name="brand" onChange={onChange}/>
        </div>
        <div onClick={onSubmitSignUpSocial}>
          <Button>가입하기</Button>
        </div>
      </div>
    </div>
  )
}
