'use client'
import Header from "./shared/header";
import Image from "next/image";
import ProfilePic from '@/public/profile pic.png';
import NoData from '@/public/nodata.png';
import style from './tax.module.css';
import '@/app/mainpage.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function TaxPage() {
    const router = useRouter();
    const savedUser = useSelector(store => store.user);
    const [requiredUser, setRequiredUser] = useState({});
    const [tax, setTax] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/tax').then(res => setTax(res.data)).catch(e => console.log(e));
        axios.get(`http://localhost:8000/user/${savedUser.user}`).then(res => setRequiredUser(res.data)).catch(e => console.log(e));
    }, []);
    const Position = requiredUser.position;
    function handleClick() {
        router.push('/newTax');
    }
    const filteredData = tax.filter(item => item.email == savedUser.user);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = selectedIndex * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = (Position === 'Human Resource' || Position === 'Admin') ? tax.slice(firstIndex, lastIndex) : filteredData.slice(firstIndex, lastIndex);
    const currentPage = Math.ceil(tax.length / recordsPerPage);
    const numbers = [...Array(currentPage + 1).keys()].slice(1);
    function ascendingSort() {
        setSelectedIndex(1);
        const sortedTax = [...tax].sort((a, b) => a.amount - b.amount);
        setTax(sortedTax);
    }
    function descendingSort() {
        setSelectedIndex(1);
        const sortedTax = [...tax].sort((a, b) => b.amount - a.amount);
        setTax(sortedTax);
    }
    return (
        <div>
            <div className={style.requests}>
                <Header />
                <div className={style.requestscontainer}>
                    <div className={style.titleandusername}>
                        <h1>Tax</h1>
                        <div className={style.nameandimg}>
                            <div className={style.nameandrole}>
                                <p className={style.username}>{requiredUser.name != undefined ? requiredUser.name : 'NAME'}</p>
                                <p className={style.role}>{requiredUser.name != undefined ? requiredUser.position : 'EMPLOYEE'}</p>
                            </div>
                            <Image className={style.profilepic} src={ProfilePic} height={40} width={40} alt=''></Image>
                        </div>
                    </div>
                    {
                        tax.length != 0 ?
                            <>
                                <div className={style.statscontainer}>
                                    <div className={style.headingspart}>
                                        <div className={style.month}><h3 className={style.h3}>Month</h3></div>
                                        <div className={style.amount}>
                                            <h3 className={style.h3}>
                                                Tax amount
                                                <span className={style.arrowcontainer}>
                                                    <div className={style.arrow}><FaArrowUp onClick={() => ascendingSort()} size={6} /><FaArrowDown onClick={() => descendingSort()} size={6} /></div>
                                                </span>
                                            </h3></div>
                                        <div className={style.status}><h3 className={style.h3}>Status</h3></div>
                                        {
                                            (Position === 'Human Resource' || Position === 'Admin') &&
                                            <div className={style.status}><h3 className={style.h3}>Email</h3></div>
                                        }
                                    </div>
                                </div>
                                <div className={style.details}>
                                    <div className={style.scroll}>
                                        {
                                            (Position === 'Human Resource' || Position === 'Admin') ?
                                                tax.map((item, index) => {
                                                    return (
                                                        <div className={style.detaileddata} key={index}>
                                                            <div className={style.month}>{item.month}</div>
                                                            <div className={style.amount}>{item.amount}</div>
                                                            <div className={style.status}>{item.status}</div>
                                                            {
                                                                ((Position === 'Human Resource' || Position === 'Admin')) &&
                                                                <div className={style.status}>{item.email}</div>
                                                            }
                                                        </div>

                                                    );
                                                }) :
                                                filteredData.map((item, index) => {
                                                    return (
                                                        <div className={style.detaileddata} key={index}>
                                                            <div className={style.month}>{item.month}</div>
                                                            <div className={style.amount}>{item.amount}</div>
                                                            <div className={style.status}>{item.status}</div>
                                                            {/* {
                                                            ((Position === 'Human Resource' || Position === 'Admin')) &&
                                                            <div className={style.status}>{item.email}</div>
                                                        } */}
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
                            <Image className={style.noData} src={NoData} width={400} height={400} alt=""></Image>
                    }
                    <div className={style.buttonDiv} onClick={handleClick}>
                        <button className={style.btn}>Add tax</button>
                    </div>
                </div>
            </div>
        </div>
    );
}



