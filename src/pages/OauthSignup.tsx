import React from 'react'
import Button from 'components/Button'

export default function SignUpSocial() {
  return (
    <div id="wrap">
      <div className="mb-view verCenter">
        <div className="inputWrap">
          <input type="text" placeholder="주소"/>
          <input type="text" placeholder="상호명"/>
        </div>
        <Button>가입하기</Button>
      </div>
    </div>
  )
}
