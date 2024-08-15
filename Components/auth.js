'use client';
import { useEffect, useState } from 'react';
import style from './auth.module.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Logo from '@/public/Logo.svg';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addUserData, resetUserData } from '@/redux/userSlice';

export default function AuthPage() {
    const now = new Date();
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentMonthName = monthNames[now.getMonth()];
    const currentMonthdate = now.getDate();
    const currentYear = now.getFullYear();
    const attendanceDate = currentMonthdate + ' ' + currentMonthName + ' ' + currentYear;
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const inComingTime = hours + ':' + minutes;
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const disPatch = useDispatch();
    const [user, setUser] = useState([]);
    const attendanceData = {
        incomingTime: inComingTime,
        date: attendanceDate,
        outgoingTime: 0,
        duration: 0,
        username: email
    };
    useEffect(() => {
        disPatch(resetUserData());
        axios.get('http://localhost:8000/user').then(res => setUser(res.data)).catch(e => console.log(e));
        localStorage.setItem('value', 0);
    }, []);
    function handleEmail(e) {
        setEmail(e.target.value);
    }
    function handlePassword(e) {
        setPassword(e.target.value);
    }
    const [isSignin, setSignin] = useState('true');
    function handleCLick() {
        isSignin ? setSignin(false) : setSignin(true);
        setEmail('');
        setPassword('');
    }
    const handleAuth = async () => {
        if(isSignin){
        if (!email || !password) {
            toast.error('Fill all fields');
        }else {
            const response = await axios.post('http://localhost:8000/login', { email, password });
            console.log('res', response);
            if (response.data) {
                disPatch(addUserData(email));
                toast.success('Successfully logged in, redirecting ...');
                axios.post('http://localhost:8000/checkin', attendanceData).then(res => console.log(res.data)).catch(e => console.log(e));
                router.push('/dashboard');
            }
            else {
                toast.error('Wrong email/password');
            }
        }
    }
    else{
        if (!email || !password ) {
            toast.error('Fill all fields');
        } else if(!(email.endsWith('@gmail.com'))){
            toast.error('Invalid email');
        } else if(password.length < 8){
            toast.error('Password must be 8 characters long');
        }
        else {
            const response = await axios.patch('http://localhost:8000/changepassword', { email, password });
            console.log(response);
            if (response.data) {
                toast.success('Password changed successfully. Login to get statrted');
                setEmail('');
                setPassword('');
            }
            else {
                toast.error('This email is not registered');
            }
        }
    }
}

    return (
        <div className={style.auth}>
            <div className={style.imageDiv}></div>
            <div className={style.contentDiv}>
                <Image src={Logo} alt='' height={100} width={180}></Image>
                <input className={style.input} onChange={handleEmail} value={email} placeholder='Email'></input>
                <input className={style.input} onChange={handlePassword} value={password} type='password' placeholder='Password'></input>
                <button onClick={handleAuth} className={style.btn}>
                    {
                        isSignin ? 'Sign in' : 'Change password'
                    }
                </button>
                <p className={style.rightText} onClick={handleCLick}>
                    {
                        isSignin ? 'Change password' : 'Login'
                    }
                </p>
            </div>
        </div>
    );
}