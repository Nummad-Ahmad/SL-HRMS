'use client'
import Image from 'next/image';
import './header.css';
import Logo from '@/public/logo.png';
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { TbCalendarDollar } from "react-icons/tb";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function Header() {
    const router = useRouter();
    const [clicked, setclicked] = useState(false);
    return (
        !clicked ?
            <div className="header">
                <div className='img-and-icon'>
                    <Image src={Logo} alt='' height={100} width={100}></Image>
                    <FaChevronCircleLeft onClick={() => setclicked(true)} size={20} className='arrow' />
                </div>
                <div className='lineContainer'>
                    <div className='right-part'></div>
                    <div className='leftPart'></div>
                </div>
                <div className='options'>
                    <div onClick={()=>router.push('/dashboard')} className='option'>
                        <MdDashboard size={17} />
                        <p>Dashboard</p>
                    </div>
                    <div onClick={() => router.push('/users')} className='option'>
                        <FaUsers size={17} />
                        <p>Users</p>
                    </div>
                    <div onClick={() => router.push('/attendance')} className='option'>
                        <FaClock size={17} />
                        <p>Attendance</p>
                    </div>
                    <div onClick={()=>router.push('/payroll')} className='option'>
                        <MdPayment size={17} />
                        <p>Payroll</p>
                    </div>
                    <div className='option'>
                        <FaEdit size={17} />
                        <p>Requests</p>
                    </div><div className='option'>
                        <TbCalendarDollar size={17} />
                        <p>Tax</p>
                    </div><div className='option'>
                        <BsFillPersonPlusFill size={17} />
                        <p>Recruitment</p>
                    </div><div className='option'>
                        <IoIosSettings size={17} />
                        <p>Settings</p>
                    </div><div className='option'>
                        <MdDashboard size={17} />
                        <p>Dashboard</p>
                    </div><div className='option'>
                        <MdDashboard size={17} />
                        <p>Dashboard</p>
                    </div>
                </div>
            </div> :
            <div className='img-and-icon-closed'>
                <Image src={Logo} alt='' height={100} width={100}></Image>
                <FaChevronCircleRight onClick={() => setclicked(false)} size={20} className='arrow' />
            </div>
    );
}