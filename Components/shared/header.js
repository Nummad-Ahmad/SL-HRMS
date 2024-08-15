'use client'
import Image from 'next/image';
import style from './header.module.css';
import Logo from '@/public/Logo.svg';
import smallLogo from '@/public/smallLogo.png';
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { GoProjectRoadmap } from "react-icons/go"
import { FaEdit } from "react-icons/fa";
import { TbCalendarDollar } from "react-icons/tb";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetUserData } from '@/redux/userSlice';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";

export default function Header() {
    const savedUser = useSelector(store => store.user).user;
    async function handleCheckout() {
        const now = new Date();
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const currentMonthName = monthNames[now.getMonth()];
        const currentMonthdate = now.getDate();
        const currentYear = now.getFullYear();
        const date = currentMonthdate + ' ' + currentMonthName + ' ' + currentYear;
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const outgoingTime = hours + ':' + minutes;
        await axios.patch('http://localhost:8000/checkout', { outgoingTime, date, username: savedUser }).then(res => console.log(res)).catch(e => console.log(e));
    }
    const dispatch = useDispatch();
    const router = useRouter();
    const [selectedIndex, setSelectedIndex] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('value');
            return saved !== null ? JSON.parse(saved) : 0;
        }
        return 0;
    });
    const [isCollapsed, setCollapsed] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('check');
            return saved !== null ? JSON.parse(saved) : false;
        }
        return false;
    });
    useEffect(() => {
        localStorage.setItem('value', JSON.stringify(selectedIndex));
        localStorage.setItem('check', JSON.stringify(isCollapsed));
    }, [selectedIndex, isCollapsed]);

    function changeOption(value) {
        const newValue = parseInt(value, 10);
        if (!isNaN(newValue)) {
            setSelectedIndex(newValue);
        }

        if (value == 0) {
            router.push('/dashboard')
        }
        else if (value == 1) {
            router.push('/users')
        }
        else if (value == 2) {
            router.push('/attendance')
        }
        else if (value == 3) {
            router.push('/projects')
        }
        else if (value == 4) {
            router.push('/requests')
        }
        else if (value == 5) {
            router.push('/tax')
        }
    }
    function setVisibility() {
        setCollapsed(prev => !prev);
    }
    console.log('isCollapsed', isCollapsed);
    return (
        <>
            {
                !isCollapsed ?
                    <div className={style.header}>
                        <div className={style.arrowandimage}>
                            <Image className={style.image} src={Logo} alt='' height={100} width={170}></Image>
                            <span onClick={setVisibility} className={style.chevron}><IoIosArrowDropleftCircle color='white' size={35} /></span>
                        </div>
                        <div className={style.lineContainer}>
                            <div className={style.rightPart}></div>
                            <div className={style.leftPart}></div>
                        </div>
                        <div className={style.options}>
                            <div onClick={() => changeOption(0)} className={`${style.option} ${selectedIndex == 0 ? style.isActive : ''}`} >
                                <MdDashboard size={17} color='white' />
                                <p className={style.p}>Dashboard</p>
                            </div>
                            <div onClick={() => changeOption(1)} className={`${style.option} ${selectedIndex == 1 ? style.isActive : ''}`} >
                                <FaUsers size={17} color='white' />
                                <p className={style.p}>Users</p>
                            </div>
                            <div onClick={() => changeOption(2)} className={`${style.option} ${selectedIndex == 2 ? style.isActive : ''}`}>
                                <FaClock size={17} color='white' />
                                <p className={style.p}>Attendance</p>
                            </div>
                            <div onClick={() => changeOption(3)} className={`${style.option} ${selectedIndex == 3 ? style.isActive : ''}`}>
                                <GoProjectRoadmap size={17} color='white' />
                                <p className={style.p}>Projects</p>
                            </div>
                            <div onClick={() => changeOption(4)} className={`${style.option} ${selectedIndex == 4 ? style.isActive : ''}`}>
                                <FaEdit size={17} color='white' />
                                <p className={style.p}>Requests</p>
                            </div>
                            <div onClick={() => changeOption(5)} className={`${style.option} ${selectedIndex == 5 ? style.isActive : ''}`}>
                                <TbCalendarDollar size={17} color='white' />
                                <p className={style.p}>Tax</p>
                            </div>
                        </div>
                        <div onClick={() => { handleCheckout(); router.push('/'); dispatch(resetUserData()) }} className={style.logoutDiv}>
                            <h5>Logout</h5>
                        </div>
                    </div>
                    :
                    <div className={style.collapsedheader}>
                        {/* <div onClick={setVisibility} className={style.collapsedarrowandimage}> */}
                        {/* <Image src={smallLogo} height={40} width={40} alt=''></Image> */}
                        <div onClick={setVisibility} className={style.arrow}><IoIosArrowDroprightCircle color='white' size={35} /></div>
                        {/* </div> */}
                        <div className={style.lineContainer}>
                            <div className={style.rightPart}></div>
                            <div className={style.leftPart}></div>
                        </div>
                        <div className={style.collapsedoption}>
                            <div onClick={() => changeOption(0)} className={`${style.option} ${selectedIndex == 0 ? style.collapsedactive : ''}`} >
                                <MdDashboard size={25} color='white' />
                            </div>
                            <div onClick={() => changeOption(1)} className={`${style.option} ${selectedIndex == 1 ? style.collapsedactive : ''}`}>
                                <FaUsers size={25} color='white' />
                            </div>
                            <div onClick={() => changeOption(2)} className={`${style.option} ${selectedIndex == 2 ? style.collapsedactive : ''}`}>
                                <FaClock size={25} color='white' />
                            </div>
                            <div onClick={() => changeOption(3)} className={`${style.option} ${selectedIndex == 3 ? style.collapsedactive : ''}`}>
                                <GoProjectRoadmap size={25} color='white' />
                            </div>
                            <div onClick={() => changeOption(4)} className={`${style.option} ${selectedIndex == 4 ? style.collapsedactive : ''}`}>
                                <FaEdit size={25} color='white' />
                            </div>
                            <div onClick={() => changeOption(5)} className={`${style.option} ${selectedIndex == 5 ? style.collapsedactive : ''}`}>
                                <TbCalendarDollar size={25} color='white' />
                            </div>
                        </div>
                        <div onClick={() => { handleCheckout(); router.push('/'); dispatch(resetUserData()) }} className={style.collapsedlogoutDiv}>
                            <TbLogout2 size={25} color='white'/>
                        </div>
                    </div> 
            }
        </>
    );
}