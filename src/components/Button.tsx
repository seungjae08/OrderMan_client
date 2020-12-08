import React, { ReactChildren, ReactChild } from 'react'

type propsType = {
  children?: string | ReactChildren | ReactChild | undefined;
  color?:string;
  bgColor?:string;
  borderColor?:string;
}
export default function Button(props : propsType) {

  let color = props.color? props.color : "white";
  let bgColor = props.bgColor? props.bgColor : "#F87946"
  let border = props.borderColor? `1px solid ${props.borderColor}` : 'none'
  return (
    <div className="Button-wrap" style={{color, backgroundColor:bgColor, border}}>
      {props.children}
    </div>
  )
}
