'use client';
import Image from 'next/image';
import style from './dashboard.module.css';
import '@/app/mainpage.css';
import Header from "./shared/header";
import Pic1 from '@/public/prize1.jpeg';
import Pic2 from '@/public/prize2.jpeg';
import ProfilePic from '@/public/profile pic.png';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useEffect, useState } from 'react';
import PieChart from './piechart';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function DashBoardPage() {
    const savedUser = useSelector(store => store.user);
    const [value, setValue] = useState(0);
    const [Department, setDepartment] = useState([]);
    const [user, setUser] = useState([]);
    const [requiredUser, setRequiredUser] = useState({});
    const images = [Pic1, Pic2];
    const currentDate = new Date();
    const today = currentDate.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const currentMonthName = monthNames[currentDate.getMonth()];
    function changeValue() {
        (value == 0) ? setValue(value + 1) : setValue(value - 1);
    }
    useEffect(() => {
        axios.get('http://localhost:8000/dashboard').then(res => setDepartment(res.data)).catch(e => console.log(e));
        axios.get(`http://localhost:8000/user`).then(res => setUser(res.data)).catch(e => console.log(e));
        axios.get(`http://localhost:8000/user/${savedUser.user}`).then(res => setRequiredUser(res.data)).catch(e => console.log(e));
    }, []);
    const males = user.filter(item => item.gender === 'Male').length;
    const females = user.filter(item => item.gender === 'Female').length;
    const birthdayData = user.filter(item => {
        if (!item.birthday) return false;
        const birthdayMonth = item.birthday.split(' ')[1];
        const birthdayDate = (item.birthday.split(" ")[0]);
        return ((birthdayMonth === currentMonthName) && (birthdayDate > today));
    });
    return (
        <div className={style.dashboard}>
            <Header></Header>
            <div className={style.dashContainer}>
                <div className={style.titleandusername}>
                    <h2>Dashboard</h2>
                    <div className={style.nameandimg}>
                        <div className={style.nameandrole}>
                            <p className={style.username}>{requiredUser.name != undefined ? requiredUser.name : 'NAME'}</p>
                            <p className={style.role}>{requiredUser.name != undefined ? requiredUser.position : 'EMPLOYEE'}</p>
                        </div>
                        <Image className={style.profilePic} src={ProfilePic} height={40} width={40} alt=''></Image>
                    </div>
                </div>
                <div className={style.ayatcontainer}>
                    <h3 className={style.Ayat}>All praise is for Allah—Lord of all worlds (Al-Fatiha) - 1:2</h3>
                </div>
                <div className={style.eventandgender}>
                    <div className={style.event}>
                        <div onClick={changeValue}><FaChevronCircleLeft size={20} /></div>
                        <Image src={images[value]}></Image>
                        <div onClick={changeValue}><FaChevronCircleRight onClick={changeValue} size={20} /></div>
                    </div>
                    <div className={style.gender}>
                        <h2>Gender Ratio</h2>
                        <div className={style.piechartcontainer}><PieChart male={males} female={females}></PieChart></div>
                        <div></div>
                    </div>
                </div>
                <div className={style.teamandbirthdays}>
                    <div className={style.teamcontainer}>
                        <div className={style.row}>
                            <h4 className={style.boldtext}>DEPARTMENTS</h4>
                            <p className={style.boldtext}>EMPLOYEES</p>
                        </div>
                        {
                            Department.length != 0 && Department.map((item, index) => {
                                return (
                                    <div className={style.row} key={index}>
                                        <h4 className={style.h4}>{item.department}</h4>
                                        <p className={style.p}>{item.count}</p>
                                    </div>
                                )
                            })

                        }
                    </div>
                    <div className={style.birthdayscontainer}>
                        <div className={style.row}>
                            <h4 className={style.boldtext}>Upcoming birthdays</h4>
                            <p className={style.bluetext}>Date</p>
                        </div>
                        {
                            birthdayData.length != 0 ?
                                birthdayData.map((item, index) => {
                                    return (
                                        <div className={style.row} key={index}>
                                            <div className={style.nameandpic}>
                                                <Image className={style.profilepic} src={ProfilePic} height={35} width={35} alt='' />
                                                <div className={style.nameAndDesignationDiv}>
                                                    <p className={style.nameAndDesignation && style.p} >{item.name}</p>
                                                    <p className={style.designation}>{item.position}</p>
                                                </div>
                                            </div>
                                            <p className={style.bluetext}>{item.birthday}</p>
                                        </div>
                                    )
                                }) :
                                <p className={style.bluetext}>No birthdays</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}