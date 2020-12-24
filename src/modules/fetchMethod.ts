import {serverPath} from 'modules/serverPath';

type callbackTypes = (status:number, data:any) => void;

export const fetchGet = (url:string,cb:callbackTypes, catchCb:(e:Error|undefined)=>void) => {
  fetch(serverPath + url, {
    method: 'GET',
    mode: 'cors', 
    credentials: 'include',
    headers: {'Content-Type': 'application/json'}
  }).then(async (res)=>{
    let data = await res.json();
    cb(res.status, data);
  })
  .catch((e:Error)=>{
    console.log(e);
    catchCb(e);
  })
}

export const fetchPost = function(url:string, body:object, cb:callbackTypes, catchCb:(e:Error)=>void){
  fetch(serverPath + url, {
    method: 'POST',
    mode: 'cors', 
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }).then((res)=>{
    console.log(res);
    let data = res.json();
    cb(res.status, data);
  })
  .catch((e:Error)=>{
    catchCb(e);
  })
}