import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/Button';


export const Header=()=>{
    
    return (
        <div className="Header-wrap">
            <div className="Header-gnp">
                <h1 className="Header-h1">
                    ORDERMAN
                    <div className="Header-loginbtn">
                        <Link to="/Login" >
                            <Button>로그인</Button>
                        </ Link>
                    </div>
                </h1>
                
            </div>
        </div>
    )
}