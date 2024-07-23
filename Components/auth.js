'use client';
import { useState } from 'react';
import './auth.css';
import { useRouter } from 'next/navigation';
export default function AuthPage(){
    const router = useRouter();
    const [isSignin, setSignin] = useState('true');
    function handleCLick(){
        isSignin ? setSignin(false) : setSignin(true);  
    }
    return (
        <div className="auth">
            <div className='imageDiv'></div>
            <div className='contentDiv'>
                <h1>HRMS</h1>
                <input placeholder='Email'></input>
                <input placeholder='Password'></input>
                <button onClick={()=> router.push('/dashboard')} className='btn'>
                {
                    isSignin ? 'Sign in' : 'Sign up'
                }
                </button>
                <p className='rightText'  onClick={handleCLick}>
                {
                    isSignin ? 'Register' : 'Login'
                }
                </p>
            </div>
        </div>
    );
}