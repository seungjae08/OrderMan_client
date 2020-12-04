import React, {useState, useEffect, useCallback, ChangeEvent} from 'react';
import {serverPath} from 'modules/serverPath';
import { History } from 'history';
import axios from 'axios';
import {Link} from 'react-router-dom';
import InputBirth from 'components/InputBirth';
import { Header } from 'components/Header'
//import { useDispatch, useSelector } from 'react-redux';
//import { RootState } from 'reducers';
import Button from 'components/Button';
// import { changeUnSignInfo } from 'reducers/order';

type propsTypes = {
  history : History
}

type InputTypes = {
  mobile:string;
  address:string;
  brand:string;
  yearList: number[];
  monthList: number[];
  dayList: number[];
  year: string;
  month:string;
  day:string;
}

export default function UnSigninOrder
(props: propsTypes) {

  const [inputs, setInputs] = useState<InputTypes>({
    mobile:"",
    address:"",
    brand:"",
    yearList:[],
    monthList:[],
    dayList:[],
    year:"1980",
    month:"1",
    day:"1"
  });

  //error Message
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    //장바구니 임시저장 불러오기
    axios.get(serverPath + '/order/temp', { withCredentials: true }).then(res=>{
      console.log(res);
    })

    let [yearList, monthList, dayList] = generateBirth();
    setInputs((inputs)=>({
      ...inputs,
      yearList,
      monthList,
      dayList
    }))
  }, []);

  const generateBirth = function(){
    let yearList = [];
    let monthList = [];
    let dayList = [];
    for(let i=1940; i<2002; i++){
      yearList.push(i);
    }
    for(let i=1; i<=12; i++){
      monthList.push(i);
    }
    for(let i=1; i<=31; i++){
      dayList.push(i);
    }
    return [yearList, monthList, dayList];
  }


  const onChangeSelect = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value
    }));
  },[]);

  

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value
    }));
  },[])

  const onDispatchUnSignOrder = useCallback(()=>{
    let {mobile, brand, address, year, month, day} = inputs;
    if(mobile === "" || brand === "" || address === ""){
      setErrorMsg('모든 항목을 입력해주세요');
      return;
    }

    axios.post(serverPath + '/unknown/info',{
      mobile: inputs.mobile,
      address: inputs.address,
      brand : inputs.brand,
      birth:`${year.slice(2)}-${month}-${day}`
    },{ withCredentials: true }).then((res)=>{
      props.history.push('/order');
    });

  },[inputs, props.history]);

  return (
    <div id="wrap" className="UnSignInOrder-wrap">
      <div className="mb-view verCenter">
        <Header/>
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
          <h3>생년월일</h3>
          <InputBirth onChangeSelect={onChangeSelect} yearList={inputs.yearList} monthList={inputs.monthList} dayList={inputs.dayList} year={inputs.year} month={inputs.month} day={inputs.day}/>
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
