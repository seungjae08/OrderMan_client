import React from 'react'

type propsType = {
  children: string
}
export default function Button(props : propsType) {
  return (
    <div className="Button-wrap">
      {props.children}
    </div>
  )
}
