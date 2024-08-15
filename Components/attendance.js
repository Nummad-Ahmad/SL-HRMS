'use client';
import Header from "./shared/header";
import Image from "next/image";
import ProfilePic from '@/public/profile pic.png';
import NoData from '@/public/nodata.png';
import style from './attendance.module.css';
import '@/app/mainpage.css';
import { FaRegCalendar } from "react-icons/fa";
import { MdEditCalendar } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
export default function AttendancePage() {
    const savedUser = useSelector(store => store.user);
    const [requiredUser, setRequiredUser] = useState({});
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const [attendance, setAttendance] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/attendance').then(res => setAttendance(res.data)).catch(e => console.log(e));
        axios.get(`http://localhost:8000/user/${savedUser.user}`).then(res => setRequiredUser(res.data)).catch(e => console.log(e));
    }, []);
    const Position = requiredUser.position;
    let currentDate = new Date(); 
    let month = currentDate. getMonth();
    const currentMonthName = monthNames[month];
    const filteredData = attendance.filter(item => item.date.includes(currentMonthName));
    const employeeAttendance = filteredData.filter(item => item.username === savedUser.user);
    var totalDays;
    const [selectedIndex, setSelectedIndex] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = selectedIndex * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records =  (Position === 'Human Resource' || Position === 'Admin') ? filteredData.slice(firstIndex, lastIndex) : employeeAttendance.slice(firstIndex, lastIndex);
    const currentPage = Math.ceil(filteredData.length / recordsPerPage);
    const numbers = [...Array(currentPage + 1).keys()].slice(1);
    (month == 0 || month == 2 || 4 || month == 6 || month == 7 || 9 || 11) ? totalDays = 31 : (month == 1) ? totalDays = 28 : totalDays = 30;
    return (
        <>
            <div className={style.attedance}>
                <Header />
                <div className={style.attedancecontainer}>
                    <div className={style.titleandusername}>
                        <h1>Attendance</h1>
                        <div className={style.nameandimg}>
                            <div className={style.nameandrole}>
                                <p className={style.username}>{requiredUser.name != undefined ? requiredUser.name : 'NAME'}</p>
                                <p className={style.role}>{requiredUser.name != undefined ? requiredUser.position : 'EMPLOYEE'}</p>
                            </div>
                            <Image className={style.profilepic} src={ProfilePic} height={40} width={40} alt=''></Image>
                        </div>
                    </div>

                    {
                        attendance.length != 0 ?
                            <>
                                {/* <div className={style.statscontainer}>
                                    <div className={style.headingspart}>
                                        <div className={style.row}>
                                            <FaRegCalendar />
                                            <p className={style.p}>Total days {totalDays}</p>
                                        </div>
                                        <div className={style.row}>
                                            <MdEditCalendar />
                                            <p className={style.p}>Working days 23</p>
                                        </div>
                                        <div className={style.row}>
                                            <div style={{ color: 'green' }}><FaCheck /></div>
                                            <p className={style.p}>Present {isPresent}</p>
                                        </div>
                                        <div className={style.row}>
                                            <div style={{ color: 'red' }}><RxCross1 /></div>
                                            <p className={style.p}>Absent {isAbsent}</p>
                                        </div>
                                    </div>
                                </div> */}
                                <div className={style.details}>
                                    {/* <div className={style.showmonth}>
                                        <span onClick={() => setMonth(month - 1)}><FaChevronCircleLeft /></span>
                                        <p className={style.date}>{currentMonthName} 2024</p>
                                        <span onClick={() => setMonth(month + 1)}><FaChevronCircleRight /></span>
                                    </div> */}
                                    <div className={style.detaileddata}>
                                        <div className={style.heading}><h3 className={style.h3}>Date</h3></div>
                                        <div className={style.heading}><h3 className={style.h3}>Time in</h3></div>
                                        <div className={style.heading}><h3 className={style.h3}>Time out</h3></div>
                                        <div className={style.heading}><h3 className={style.h3}>Duration</h3></div>
                                        {
                                            (Position === 'Human Resource' || Position === 'Admin') &&
                                            <div className={style.heading}><h3 className={style.h3}>Email</h3></div>
                                        }
                                    </div>
                                    <div className={style.scroll}>
                                        {
                                            filteredData.length != 0 &&
                                            (Position === 'Human Resource' || Position === 'Admin') ?
                                             records.map((item, index) => {
                                                return (
                                                    <div className={style.detaileddata} key={index}>
                                                        <div className={style.heading}>{item.date}</div>
                                                        <div className={style.heading}>{item.incomingTime}</div>
                                                        <div className={style.heading}>{item.outgoingTime}</div>
                                                        <div className={style.heading}>{item.duration}</div>
                                                            <div className={style.heading}>{item.username}</div>
                                                    </div>

                                                );
                                            }) :
                                            records.map((item, index) => {
                                                return (
                                                    <div className={style.detaileddata} key={index}>
                                                        <div className={style.heading}>{item.date}</div>
                                                        <div className={style.heading}>{item.incomingTime}</div>
                                                        <div className={style.heading}>{item.outgoingTime}</div>
                                                        <div className={style.heading}>{item.duration}</div>
                                                        
                                                    </div>

                                                );
                                            }) 
                                        }
                                    </div>
                                </div>
                                <span className={style.pagination}>
                                {
                                    numbers.map((data, index) => {
                                        return (
                                            <>
                                                <div onClick={() => setSelectedIndex(data)} key={index} className={`${style.paginationnumber} ${selectedIndex == data ? style.activeIndex : ''}`}>{data}</div>
                                            </>
                                        )
                                    })
                                }
                            </span>
                            </>
                            :
                            <>
                                <Image className={style.noData} src={NoData} width={400} height={400} alt=""></Image>
                            </>
                    }
                </div>
            </div>
        </>
    );
}