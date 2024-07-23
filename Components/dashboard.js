'use client';
import Image from 'next/image';
import './dashboard.css';
import Header from "./shared/header";
import { IoPersonSharp } from "react-icons/io5";
import Pic1 from '@/public/prize1.jpeg';
import Pic2 from '@/public/prize2.jpeg';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useState } from 'react';
import PieChart from './piechart';
export default function DashBoardPage() {
    const [value, setValue] = useState(0);
    const images = [Pic1, Pic2];
    function changeValue() {
        (value == 0) ? setValue(value + 1) : setValue(value - 1);
        console.log(value);
    }
    return (
        <div className='dashboard'>
            <Header></Header>
            <div className='dash-container'>
                <div className='title-and-username'>
                    <h2>Dashboard</h2>
                    <div className='name-and-img'>
                        <div className='name-and-role'>
                            <p className='username'>Muhammad Ahmad</p>
                            <p className='role'>EMPLOYEE</p>
                        </div>
                        <IoPersonSharp size={30} />
                    </div>
                </div>
                <div className='ayat-container'>
                    <h3 className='Ayat'>All praise is for Allah—Lord of all worlds (Al-Fatiha) - 1:2</h3>
                </div>
                <div className='event-and-gender'>
                    <div className='event'>
                        <div onClick={changeValue}><FaChevronCircleLeft size={20} /></div>
                        <Image src={images[value]}></Image>
                        <div onClick={changeValue}><FaChevronCircleRight onClick={changeValue} size={20} /></div>
                    </div>
                    <div className='gender'>
                        <h2>Gender Ratio</h2>
                        <div className='pie-chart-container'><PieChart male={190} female={13}></PieChart></div>
                        <div></div>
                    </div>
                </div>
                <div className='team-and-birthdays'>
                    <div className='team-container'>
                        <div className='row'>
                            <h4 className='bold-text'>Team Members</h4>
                            <p className='blue-text'>View All</p>
                        </div>
                        <div className='row'>
                            <h4>HUMAN RESOURCES</h4>
                            <p>3</p>
                        </div>
                        <div className='row'>
                            <h4>SOFTWARE QUALITY ASSURANCE ENGINEER</h4>
                            <p>7</p>
                        </div>                     <div className='row'>
                            <h4>PROJECT MANAGER</h4>
                            <p>4</p>
                        </div>
                    </div>
                    <div className='birthdays-container'>
                        <div className='row'>
                            <h4 className='bold-text'>Upcoming Birthdays</h4>
                            <p className='blue-text'>View All</p>
                        </div>
                        <div className='row'>
                            <div className='name-and-pic'>
                                <IoPersonSharp size={30}/>
                                <div className='name-and-designation'>
                                    <p className='nameAndDesignation'>ABC</p>
                                    <p className='designation'>SOFTWARE ENGINEER</p>
                                </div>
                            </div>
                            <p className='blue-text'>Sat, Aug 20</p>
                        </div>
                        <div className='row'>
                            <div className='name-and-pic'>
                                <IoPersonSharp size={30}/>
                                <div className='name-and-designation'>
                                    <p className='nameAndDesignation'>DEF</p>
                                    <p className='designation'>HR EXECUTIVE</p>
                                </div>
                            </div>
                            <p className='blue-text'>Thu, Aug 02</p>
                        </div>
                        <div className='row'>
                            <div className='name-and-pic'>
                                <IoPersonSharp size={30}/>
                                <div className='name-and-designation'>
                                    <p className='nameAndDesignation'>GHI</p>
                                    <p className='designation'>SOFTWARE ENGINEER</p>
                                </div>
                            </div>
                            <p className='blue-text'>Sun, July 30</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}