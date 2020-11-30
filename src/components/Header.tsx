import { type } from 'os';
import React,{ButtonHTMLAttributes, ChangeEvent, useState} from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/Button';


export const Header=()=>{
    
    return (
        <div className="Main-wrap Header-wrap">
            <div className="Main-wrap Header-gnp">
                <h1 className="Main-wrap Header-h1">ORDERMAN</h1>
                <Link to="/Login">
                    <Button>로그인</Button>
                </ Link>
            </div>
        </div>
    )
}