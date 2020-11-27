import React from 'react'

type propsType = {
  children: string,
  color?:string,
  bgColor?:string
}
export default function Button(props : propsType) {

  let color = props.color? props.color : "white";
  let bgColor = props.bgColor? props.bgColor : "#ff7f00"
  return (
    <div className="Button-wrap" style={{color, backgroundColor:bgColor}}>
      {props.children}
    </div>
  )
}
