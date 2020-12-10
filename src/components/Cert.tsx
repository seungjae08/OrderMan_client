import React, {useState, useCallback, ChangeEvent} from 'react';
import {serverPath} from 'modules/serverPath';

type propTypes = {
  mobile: string;
  onChangeInput:(e: ChangeEvent<HTMLInputElement>)=>void;
}


export default function Cert(props: propTypes) {

  const [certErrorMsg, setCertErrorMsg] = useState('');
  const [isRenderCertInput, setIsRenderCertInput] = useState(false);
  const [verifyNumber, setVerifyNumber]=useState('');
  const [isSuccessCertMobile, setIsSuccessCertMobile]=useState(false);

  const isCelluar = (asValue:string)=>{
    var regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
  }

  const handleSubmitMobile = useCallback(()=>{

    if(isCelluar(props.mobile)===false){
      setCertErrorMsg('양식에 맞게 입력해주세요');
      return;
    }

    //전송
    fetch(serverPath + '/user/mobile', {
      method: 'POST',
      mode: 'cors', 
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        mobile: props.mobile  
      })
    }).then((res)=>{
      if(res.status===200){
        //인증번호 정상발송
        setIsRenderCertInput(true);
      }else{
        //발송 미처리
        setCertErrorMsg('인증번호 발송이 완료되지 않았습니다. 다시 시도해주세요.')
      }
    })
    .catch((e:Error)=>{
      setCertErrorMsg('인증번호 발송이 완료되지 않았습니다. 다시 시도해주세요.')
    })


  },[]);

  const handleSubmitVerifyNumber = useCallback(() => {
    fetch(serverPath + '/user/mobile', {
      method: 'POST',
      mode: 'cors', 
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        mobile: props.mobile,
        verifyNumber
      })
    }).then((res)=>{
      if(res.status===200){
        //인증번호 정상발송
        setIsRenderCertInput(true);
      }else{
        //발송 미처리
        setCertErrorMsg('인증번호 발송이 완료되지 않았습니다. 다시 시도해주세요.')
      }
    })
    .catch((e:Error)=>{
      setCertErrorMsg('인증번호 발송이 완료되지 않았습니다. 다시 시도해주세요.')
    })
  },[]);

  const handlePropChangeInput = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    setCertErrorMsg('');
    props.onChangeInput(e);
  },[])

  const changeVerifyNumber = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    setCertErrorMsg('');
    setVerifyNumber(e.target.value);
  },[]);



  if(isSuccessCertMobile){
    return (
      <div>
          <div className="flex">
            <input type="text" value={props.mobile} readOnly/>
          </div>
          <div className="warning_text">휴대폰 인증 완료</div>
      </div>
    )
  }else{
    return(
      <div>
        <div className="flex">
          <input type="text" placeholder="ex) 010-0000-0000" value={props.mobile} onChange={handlePropChangeInput} name="mobile"/> 
          <div>
            <button className="btn st2" onClick={handleSubmitMobile}>인증번호 발송</button>
          </div>
        </div>
        { 
          isRenderCertInput && 
          <div className="flex">
            <input type="text" placeholder="인증번호" value={verifyNumber} onChange={changeVerifyNumber} name="verifyNumber"/> 
            <div>
              <button className="btn st2" onClick={handleSubmitVerifyNumber}>인증번호 확인</button>
            </div>
          </div>
        }
        {
          certErrorMsg &&
          <div className="warning_text">{certErrorMsg}</div>
        }
      </div>
    )
  }
}
