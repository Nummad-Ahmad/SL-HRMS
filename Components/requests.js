'use client';
import Header from "./shared/header";
import Image from "next/image";
import ProfilePic from '@/public/profile pic.png';
import NoData from '@/public/nodata.png';
import style from './requests.module.css';
import '@/app/mainpage.css';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function RequestsPage() {
    const savedUser = useSelector(store => store.user);
    const [requiredUser, setRequiredUser] = useState({});
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/request').then(res => setRequests(res.data)).catch(e => console.log(e));
        axios.get(`http://localhost:8000/user/${savedUser.user}`).then(res => setRequiredUser(res.data)).catch(e => console.log(e));
    }, []);
    const Position = requiredUser.position;
    const filteredData = requests.filter(item => item.email === savedUser.user);
    const router = useRouter();
    const [selectedIndex, setSelectedIndex] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = selectedIndex * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = (Position === 'Human Resource' || Position === 'Admin') ? requests.slice(firstIndex, lastIndex) : filteredData.slice(firstIndex, lastIndex);
    const currentPage = Math.ceil(requests.length / recordsPerPage);
    const numbers = [...Array(currentPage + 1).keys()].slice(1);
    function ascendingSort() {
        setSelectedIndex(1);
        const sortedRequests = [...requests].sort((a, b) => a.email.localeCompare(b.email));
        setRequests(sortedRequests);
    }
    function descendingSort() {
        setSelectedIndex(1);
        const sortedRequests = [...requests].sort((a, b) => b.email.localeCompare(a.email));
        setRequests(sortedRequests);
    }
    return (
        <div className={style.requests}>
            <Header />
            <div className={style.requestscontainer}>
                <div className={style.titleandusername}>
                    <h1>Requests</h1>
                    <div className={style.nameandimg}>
                        <div className={style.nameandrole}>
                            <p className={style.username}>{requiredUser.name != undefined ? requiredUser.name : 'NAME'}</p>
                            <p className={style.role}>{requiredUser.name != undefined ? requiredUser.position : 'EMPLOYEE'}</p>
                        </div>
                        <Image className={style.profilepic} src={ProfilePic} height={40} width={40} alt=''></Image>
                    </div>
                </div>
                {
                    requests.length != 0 ?
                        <>
                            <div className={style.btnContainer}>
                            </div>
                            <div className={style.statscontainer}>
                                <div className={style.headingspart}>
                                    <p className={style.type}><h3 className={style.h3}>Leave Type</h3></p>
                                    <p className={style.days}><h3 className={style.h3}>Total Days</h3></p>
                                    <p className={style.date}><h3 className={style.h3}>Date</h3></p>
                                    <p className={style.status}><h3 className={style.h3}>Status</h3></p>
                                    {
                                        (Position === 'Human Resource' || Position === 'Admin') &&
                                        <p className={style.email}>
                                            <h3 className={style.h3}>
                                                Email
                                                <span className={style.arrowcontainer}>
                                                    <div className={style.arrow}><FaArrowUp onClick={() => ascendingSort()} size={6} /><FaArrowDown onClick={() => descendingSort()} size={6} /></div>
                                                </span>
                                            </h3></p>
                                    }
                                </div>
                            </div>
                            <div className={style.details}>
                                <div className={style.scroll}>
                                    {
                                        (Position === 'Human Resource' || Position === 'Admin') ?
                                            records.map((item, index) => {
                                                return (
                                                    <div className={style.detaileddata} key={index}>
                                                        <div className={style.type}>{item.leaveType}</div>
                                                        <div className={style.days}>{item.days}</div>
                                                        <div className={style.date}>{item.leaveDate}</div>
                                                        <div className={style.status}>{item.leaveStatus}</div>
                                                        {
                                                            (Position === 'Human Resource' || Position === 'Admin') &&
                                                            <div className={style.email}>{item.email}</div>
                                                        }
                                                    </div>

                                                );
                                            }) :
                                            records.map((item, index) => {
                                                return (
                                                    <div className={style.detaileddata} key={index}>
                                                        <div className={style.type}>{item.leaveType}</div>
                                                        <div className={style.days}>{item.days}</div>
                                                        <div className={style.date}>{item.leaveDate}</div>
                                                        <div className={style.status}>{item.leaveStatus}</div>

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
                            <div className={style.addreq}>
                                <button onClick={() => router.push('./newrequest')} className={style.addbutton}>Add request</button>
                            </div>
                        </>
                        :
                        <Image className={style.noData} src={NoData} width={400} height={400} alt=""></Image>
                }
            </div>
        </div>
    );
}