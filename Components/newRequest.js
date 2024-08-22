'use client';
import Header from "./shared/header";
import style from './newRequest.module.css';
import '@/app/mainpage.css';
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
export default function NewRequestPage() {
    const router = useRouter();
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var formattedDate = day + "-" + month + "-" + year;
    const savedUser = useSelector(store => store.user).user;
    const typeArray = [
        { value: 'Half', label: 'Half' },
        { value: 'Full', label: 'Full' }
    ];
    const dayArray = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
    ];
    const statusArray = [
        { value: 'Paid', label: 'Paid' },
        { value: 'Unpaid', label: 'Unpaid' },
    ];
    const [type, setType] = useState('Half');
    const [days, setDay] = useState(1);
    const [status, setStatus] = useState('Unpaid');
    const [date, setDate] = useState(1);
    const [res, setRes] = useState(false);
    function handleType(e) {
        setType(e.target.value);
    }
    function handleDays(e) {
        setDay(e.target.value);
    }
    function handleStatus(e) {
        setStatus(e.target.value);
    }
    function handleDate(e) {
        const date = new Date(e.target.value);
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'long' });
        const formattedDate = `${day} ${month}`;
        setDate(e.target.value);
    }
    function handleClick() {
        const newRequest = {
            leaveType: type,
            days: days,
            leaveDate: date,
            leaveStatus: status,
            email: savedUser,
        };
        axios.post('http://localhost:8000/request', newRequest).then(res => setRes(true)).catch(e => setRes(false));
        if (res) {
            toast.success('New request added');
            router.push('/requests');
        } else {
            toast.success('New request added');
        }
        router.push('/requests');
        console.log('type', newRequest);
    }
    return (
        <div className={style.requests}>
            <Header />
            <div className={style.requestscontainer}>
                <h1> Requests &gt; <span className={style.light}>New Request</span> </h1>
                {/* <div className={style.formDiv}>
                    <div className={style.question}>
                        <label for="Leave type">Leave type</label>
                        <select onChange={handleType} value={type}>
                            {
                                typeArray.map(type => (
                                    <option key={type.value} label={type.value}>{type.value}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={style.question}>
                        <label for="Total days">Total days</label>
                        <select onChange={handleDays} value={days}>
                            {
                                dayArray.map(type => (
                                    <option key={type.value} label={type.value}>{type.value}</option>
                                ))

                            }
                        </select>
                    </div>
                </div>
                <div className={style.formDiv}>
                    <div className={style.question}>
                        <label for="Leave status">Leave status</label>
                        <select className={style.select} onChange={handleStatus} value={status}>
                            {
                                statusArray.map(type => (
                                    <option key={type.value} label={type.value}>{type.value}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={style.question}>
                        <p className={style.p}>Date</p>
                        <input onChange={handleDate} className={style.select} name='date' id='date' type="date" />
                    </div>
                </div> */}
                <div className={style.maincontainer}>
                    <div className={style.question}>
                        <label for="Leave type">Leave type</label>
                        <select onChange={handleType} value={type}>
                            {
                                typeArray.map(type => (
                                    <option key={type.value} label={type.value}>{type.value}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={style.question}>
                        <label for="Total days">Total days</label>
                        <select onChange={handleDays} value={days}>
                            {
                                dayArray.map(type => (
                                    <option key={type.value} label={type.value}>{type.value}</option>
                                ))

                            }
                        </select>
                    </div>
                    <div className={style.question}>
                        <label for="Leave status">Leave status</label>
                        <select className={style.select} onChange={handleStatus} value={status}>
                            {
                                statusArray.map(type => (
                                    <option key={type.value} label={type.value}>{type.value}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={style.question}>
                        <p className={style.p}>Date</p>
                        <input onChange={handleDate} className={style.select} name='date' id='date' type="date" />
                    </div>
                    <button onClick={handleClick} className={style.btn}>Add</button>
                </div>
                {/* <div className={style.btnDiv}>
                    <button onClick={handleClick} className={style.btn}>Add</button>
                </div> */}
            </div>
        </div>
    );
}