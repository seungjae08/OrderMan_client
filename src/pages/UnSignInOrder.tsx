import React, {useState, useCallback, ChangeEvent} from 'react';
import { History } from 'history';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux'
import Button from 'components/Button';
import { changeUnSignInfo } from 'reducers/order';

type propsTypes = {
  history : History
}

export default function UnSigninOrder
(props: propsTypes) {

  const [inputs, setInputs] = useState({
    mobile:"",
    address:"",
    brand:""
  });

  //error Message
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value
    }));
  },[])

  // const onCertificatePhone = useCallback(() => {
  //   핸드폰 임시설정
  //   setInputs((inputs)=>({
  //     ...inputs,
  //     mobile:"010-1234-4567"
  //   }));
  // },[])

  const onDispatchUnSignOrder = useCallback(()=>{
    console.log('UnSigninOrder 디스패치 입력..');
    let {mobile, brand, address} = inputs;
    if(mobile === "" || brand === "" || address === ""){
      setErrorMsg('모든 항목을 입력해주세요');
      return;
    }
    dispatch(changeUnSignInfo({mobile, brand, address}));
    props.history.push('/order')
  },[inputs, dispatch, props.history]);

  return (
    <div id="wrap" className="UnSignInOrder-wrap">
      <div className="mb-view verCenter">
        <h2>비회원 로그인</h2>
        {/* <h3>휴대폰인증</h3> */}
        <div className="inputWrap">
          <div className="flex">
            {/* <input type="text" placeholder="핸드폰 인증" value={inputs.mobile} readOnly/> */}
            <input type="text" placeholder="핸드폰" value={inputs.mobile} onChange={onChange} name="mobile"/>
            {/* <div onClick={onCertificatePhone}>
              <button className="btn st1">인증하기</button>
            </div> */}
          </div>
          <input type="text" placeholder="주소" value={inputs.address} onChange={onChange} name="address"/>
          <input type="text" placeholder="상호명" value={inputs.brand} onChange={onChange} name="brand"/>
        </div>
        {
          errorMsg &&
          <div className="warning_text">{errorMsg}</div>
        }
        <div onClick={onDispatchUnSignOrder}>
          <Button>비회원으로 주문하기</Button>
        </div>
        <div className="warning_text">비회원 주문 시 구매 내역 정보가 저장되지 않습니다</div>

        <div className="BtnList">
          <Link to="/order">
            <Button>로그인</Button>
          </Link>
          <Link to="/order">
            <Button>회원가입</Button>
          </Link>
          <div>
            <Button color="#3B1D1D" bgColor="#FFEB00">카카오톡으로 로그인</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
